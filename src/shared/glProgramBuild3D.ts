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
            0, 0, 0,
            30, 0, 0,
            0, 150, 0,
            0, 150, 0,
            30, 0, 0,
            30, 150, 0,

            // top rung
            30, 0, 0,
            100, 0, 0,
            30, 30, 0,
            30, 30, 0,
            100, 0, 0,
            100, 30, 0,

            // middle rung
            30, 60, 0,
            67, 60, 0,
            30, 90, 0,
            30, 90, 0,
            67, 60, 0,
            67, 90, 0
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

    const translation = [150, 100]
    let angleInDegrees = 33

    const useProgram = () => {
        gl.useProgram(program)

        const angleInRadians = angleInDegrees * Math.PI / 180

        const canvas = gl.canvas as HTMLCanvasElement
        const matrix = matrix3DBuild(matrix3DGetProjection(canvas.clientWidth, canvas.clientHeight, 400))
            .translate(translation[0], translation[1], 0)
            .rotateX(angleInRadians)
            .value

        gl.uniformMatrix4fv(locations.uniforms.matrix, false, matrix)

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
