import shaderCreate from '@/shared/shaderCreate'
import glCreateProgram from '@/shared/glCreateProgram'
import matrix2DGetProjection from '@/shared/matrix2DGetProjection'
import matrix2DTranslate from '@/shared/matrix2DTranslate'
import matrix2DRotateInRadians from '@/shared/matrix2DRotateInRadians'
import matrix2DScale from '@/shared/matrix2DScale'

const glProgramBuildBase2DExample = async (gl: WebGL2RenderingContext) => {
    const vertexShader = await shaderCreate({
        gl,
        type: 'vert',
        shaderName: 'example2DTransforms'
    })
    const fragmentShader = await shaderCreate({
        gl,
        type: 'frag',
        shaderName: 'allVerticesWithUniformColor'
    })

    const program = glCreateProgram({
        gl,
        vertexShader,
        fragmentShader
    })

    // This does not goes on render loop
    const locations = {
        uniforms: {
            matrix: gl.getUniformLocation(program, 'u_matrix'),
            color: gl.getUniformLocation(program, 'u_color')
        },
        attributes: {
            verticesPosition: gl.getAttribLocation(program, 'a_position')
        }
    } as const

    const positionBuffer = gl.createBuffer()

    if (!positionBuffer) {
        throw new Error('Could not create position buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            // left column
            0, 0,
            30, 0,
            0, 150,
            0, 150,
            30, 0,
            30, 150,

            // top rung
            30, 0,
            100, 0,
            30, 30,
            30, 30,
            100, 0,
            100, 30,

            // middle rung
            30, 60,
            67, 60,
            30, 90,
            30, 90,
            67, 60,
            67, 90
        ]),
        gl.STATIC_DRAW
    )

    const vao = gl.createVertexArray()

    if (!vao) {
        throw new Error('Could not create vertex array object')
    }

    gl.bindVertexArray(vao)
    gl.enableVertexAttribArray(locations.attributes.verticesPosition)

    const size = 2
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

    const translation = [0, 0]
    let angleInDegrees = 0

    const useProgram = () => {
        gl.useProgram(program)

        const angleInRadians = angleInDegrees * Math.PI / 180

        const projectionMatrix = matrix2DGetProjection(gl.canvas.width, gl.canvas.height)

        let matrix = matrix2DTranslate(projectionMatrix, translation[0], translation[1])
        matrix = matrix2DRotateInRadians(matrix, angleInRadians)
        matrix = matrix2DScale(matrix, 1, 1)

        gl.uniformMatrix3fv(locations.uniforms.matrix, false, matrix)

        gl.uniform4f(locations.uniforms.color, Math.random(), Math.random(), Math.random(), 1)
        gl.bindVertexArray(vao)
    }

    return {
        useProgram,
        translationSet: (x: number, y: number) => {
            translation[0] = x
            translation[1] = y
        },
        setRotationDegrees: (degrees: number) => {
            angleInDegrees = degrees
        }
    }
}

export type SceneProgram = Awaited<ReturnType<typeof glProgramBuildBase2DExample>>

export default glProgramBuildBase2DExample
