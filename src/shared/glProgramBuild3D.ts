import shaderCreate from '@/shared/shaderCreate'
import glCreateProgram from '@/shared/glCreateProgram'
import matrix3DBuild from './matrix3DBuild'
import matrix3DGetProjection from './matrix3DGetProjection'

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

    const colorBuffer = gl.createBuffer()

    if (!colorBuffer) {
        throw new Error('Could not create color buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Uint8Array([
            // left column front
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,

            // top rung front
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,

            // middle rung front
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,
            200, 70, 120,

            // left column back
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,

            // top rung back
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,

            // middle rung back
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,
            80, 70, 200,

            // top
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,
            70, 200, 210,

            // top rung right
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,
            200, 200, 70,

            // under top rung
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,
            210, 100, 70,

            // between top rung and middle
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,
            210, 160, 70,

            // top of middle rung
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,
            70, 180, 210,

            // right of middle rung
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,
            100, 70, 210,

            // bottom of middle rung.
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,
            76, 210, 100,

            // right of bottom
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,
            140, 210, 80,

            // bottom
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,
            90, 130, 110,

            // left side
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220,
            160, 160, 220
        ]),
        gl.STATIC_DRAW
    )

    const positionBuffer = gl.createBuffer()

    if (!positionBuffer) {
        throw new Error('Could not create position buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            // left column front
            0, 0, 0,
            30, 0, 0,
            0, 150, 0,
            0, 150, 0,
            30, 0, 0,
            30, 150, 0,

            // top rung front
            30, 0, 0,
            100, 0, 0,
            30, 30, 0,
            30, 30, 0,
            100, 0, 0,
            100, 30, 0,

            // middle rung front
            30, 60, 0,
            67, 60, 0,
            30, 90, 0,
            30, 90, 0,
            67, 60, 0,
            67, 90, 0,

            // left column back
            0, 0, 30,
            30, 0, 30,
            0, 150, 30,
            0, 150, 30,
            30, 0, 30,
            30, 150, 30,

            // top rung back
            30, 0, 30,
            100, 0, 30,
            30, 30, 30,
            30, 30, 30,
            100, 0, 30,
            100, 30, 30,

            // middle rung back
            30, 60, 30,
            67, 60, 30,
            30, 90, 30,
            30, 90, 30,
            67, 60, 30,
            67, 90, 30,

            // top
            0, 0, 0,
            100, 0, 0,
            100, 0, 30,
            0, 0, 0,
            100, 0, 30,
            0, 0, 30,

            // top rung right
            100, 0, 0,
            100, 30, 0,
            100, 30, 30,
            100, 0, 0,
            100, 30, 30,
            100, 0, 30,

            // under top rung
            30, 30, 0,
            30, 30, 30,
            100, 30, 30,
            30, 30, 0,
            100, 30, 30,
            100, 30, 0,

            // between top rung and middle
            30, 30, 0,
            30, 30, 30,
            30, 60, 30,
            30, 30, 0,
            30, 60, 30,
            30, 60, 0,

            // top of middle rung
            30, 60, 0,
            30, 60, 30,
            67, 60, 30,
            30, 60, 0,
            67, 60, 30,
            67, 60, 0,

            // right of middle rung
            67, 60, 0,
            67, 60, 30,
            67, 90, 30,
            67, 60, 0,
            67, 90, 30,
            67, 90, 0,

            // bottom of middle rung.
            30, 90, 0,
            30, 90, 30,
            67, 90, 30,
            30, 90, 0,
            67, 90, 30,
            67, 90, 0,

            // right of bottom
            30, 90, 0,
            30, 90, 30,
            30, 150, 30,
            30, 90, 0,
            30, 150, 30,
            30, 150, 0,

            // bottom
            0, 150, 0,
            0, 150, 30,
            30, 150, 30,
            0, 150, 0,
            30, 150, 30,
            30, 150, 0,

            // left side
            0, 0, 0,
            0, 0, 30,
            0, 150, 30,
            0, 0, 0,
            0, 150, 30,
            0, 150, 0
        ]),
        gl.STATIC_DRAW
    )

    const vao = gl.createVertexArray()

    if (!vao) {
        throw new Error('Could not create vertex array object')
    }

    gl.bindVertexArray(vao)
    gl.enableVertexAttribArray(locations.attributes.verticesPosition)

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
