import shaderCreate from '@/shared/shaderCreate'
import glCreateProgram from '@/shared/glCreateProgram'
import matrix3DBuild from './matrix3DBuild'
import colorsPerVertex from '@/assets/colorsPerVertex'
import vertices from '@/assets/vertices'
import matrix3DGetProjection from './matrix3DGetProjection'
import resizeCanvasToDisplaySize from './resizeCanvasToDisplaySize'
import matrix3DBuildRotationXMatrix from './matrix3DBuildRotationXMatrix'
import matrix3DBuildRotationYMatrix from './matrix3DBuildRotationYMatrix'
import matrix3DMultiply from './matrix3DMultiply'
import matrix3DBuildLookAtMatrix from './matrix3DBuildLookAtMatrix'

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

    const verticesMatrix = matrix3DBuild(matrix3DBuildRotationXMatrix(Math.PI))
        .translate(-50, -75, -15)

    for (let ii = 0; ii < vertices.length; ii += 3) {
        const vector = verticesMatrix.applyToVec4([vertices[ii + 0], vertices[ii + 1], vertices[ii + 2], 1])
        vertices[ii + 0] = vector[0]
        vertices[ii + 1] = vector[1]
        vertices[ii + 2] = vector[2]
    }

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

    let fieldOfViewInRadians = 0
    let cameraAngleRadians = 0
    const numFs = 5
    const radius = 200

    const useProgram = () => {
        gl.useProgram(program)
        gl.bindVertexArray(vao)

        const canvas = gl.canvas as HTMLCanvasElement

        const projectionMatrix = matrix3DGetProjection({
            aspect: canvas.clientWidth / canvas.clientHeight,
            far: 2000,
            near: 1,
            fieldOfViewInRadians
        })

        const firstFPosition = [radius, 0, 0]

        const cameraMatrixPosition = matrix3DBuild(matrix3DBuildRotationYMatrix(cameraAngleRadians))
            .translate(0, 50, radius * 1.5)

        const cameraPosition = [
            cameraMatrixPosition.value[12],
            cameraMatrixPosition.value[13],
            cameraMatrixPosition.value[14]
        ]

        const up = [0, 1, 0]

        const cameraMatrix = matrix3DBuildLookAtMatrix(
            cameraPosition,
            firstFPosition,
            up
        )

        const viewMatrix = cameraMatrix.inverse()

        const viewProjectionMatrix = matrix3DBuild(matrix3DMultiply(
            projectionMatrix,
            viewMatrix.value
        ))

        for (let ii = 0; ii < numFs; ++ii) {
            const angle = ii * Math.PI * 2 / numFs

            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius
            const matrix = viewProjectionMatrix.translate(x, 0, z)

            // Set the matrix.
            gl.uniformMatrix4fv(locations.uniforms.matrix, false, matrix.value)

            // Draw the geometry.
            const primitiveType = gl.TRIANGLES
            const offset = 0
            const count = 16 * 6
            gl.drawArrays(primitiveType, offset, count)
        }
    }

    const drawScene = () => {
        resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        gl.enable(gl.CULL_FACE)
        gl.enable(gl.DEPTH_TEST)

        useProgram()
    }

    return {
        drawScene,
        setFieldOfViewInRadians: (value: number) => {
            fieldOfViewInRadians = value
        },
        setCameraAngleRadians: (value: number) => {
            cameraAngleRadians = value
        }
    }
}

export type SceneProgram = Awaited<ReturnType<typeof glProgramBuildBase2DExample>>

export default glProgramBuildBase2DExample
