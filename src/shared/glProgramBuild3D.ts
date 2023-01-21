import shaderCreate from '@/shared/shaderCreate'
import glCreateProgram from '@/shared/glCreateProgram'
import matrix3DBuild from './matrix3DBuild'
import matrix3DGetProjection from './matrix3DGetProjection'
import colorsPerVertex from '@/assets/colorsPerVertex'
import vertices from '@/assets/vertices'

const glProgramBuildBase2DExample = async (gl: WebGL2RenderingContext) => {
    const vertexShader = await shaderCreate({
        gl,
        type: 'vert',
        shaderName: 'example3DTransforms'
    })
    const fragmentShader = await shaderCreate({
        gl,
        type: 'frag',
        shaderName: 'example3DTransformsColor'
    })

    const program = glCreateProgram({
        gl,
        vertexShader,
        fragmentShader
    })

    // This does not goes on render loop
    const locations = {
        uniforms: {
            matrix: gl.getUniformLocation(program, 'u_matrix')
        },
        attributes: {
            verticesPosition: gl.getAttribLocation(program, 'a_position'),
            colors: gl.getAttribLocation(program, 'a_color')
        }
    } as const

    const positionBuffer = gl.createBuffer()

    if (!positionBuffer) {
        throw new Error('Could not create position buffer')
    }

    const vao = gl.createVertexArray()

    if (!vao) {
        throw new Error('Could not create vertex array object')
    }

    gl.bindVertexArray(vao)

    gl.enableVertexAttribArray(locations.attributes.verticesPosition)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    gl.bufferData(
        gl.ARRAY_BUFFER,
        vertices,
        gl.STATIC_DRAW
    )

    const size = 3
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0

    gl.vertexAttribPointer(
        locations.attributes.verticesPosition,
        size,
        type,
        normalize,
        stride,
        offset
    )

    const colorBuffer = gl.createBuffer()

    if (!colorBuffer) {
        throw new Error('Could not create color buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)

    gl.bufferData(
        gl.ARRAY_BUFFER,
        colorsPerVertex,
        gl.STATIC_DRAW
    )

    gl.enableVertexAttribArray(locations.attributes.colors)
    // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
    gl.vertexAttribPointer(
        locations.attributes.colors,
        // size (3 components per iteration)
        3,
        // type (the data is 8bit unsigned bytes)
        gl.UNSIGNED_BYTE,
        // normalize (convert from 0-255 to 0.0-1.0)
        true,
        // stride (0 = move forward size * sizeof(type) each iteration to get the next color)
        0,
        // offset (start at the beginning of the buffer)
        0
    )

    const translation = [0, 0, 0]
    const rotations = [0, 0, 0]

    const useProgram = () => {
        gl.useProgram(program)

        const canvas = gl.canvas as HTMLCanvasElement
        const matrix = matrix3DBuild(matrix3DGetProjection(canvas.clientWidth, canvas.clientHeight, 400))
            .translate(translation[0], translation[1], translation[2])
            .rotateX(rotations[0])
            .rotateY(rotations[1])
            .rotateZ(rotations[2])
            .value

        gl.uniformMatrix4fv(locations.uniforms.matrix, false, matrix)

        gl.bindVertexArray(vao)
    }

    return {
        useProgram,
        vertexCount: 16 * 6,
        setTranslation: (x: number, y: number, z: number) => {
            translation[0] = x
            translation[1] = y
            translation[2] = z
        },
        setRotation: (x: number, y: number, z: number) => {
            rotations[0] = x
            rotations[1] = y
            rotations[2] = z
        }
    }
}

export type SceneProgram = Awaited<ReturnType<typeof glProgramBuildBase2DExample>>

export default glProgramBuildBase2DExample
