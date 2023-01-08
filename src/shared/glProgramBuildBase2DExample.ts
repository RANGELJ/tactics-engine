import shaderCreate from '@/shared/shaderCreate'
import glCreateProgram from '@/shared/glCreateProgram'

const glProgramBuildBase2DExample = async (gl: WebGL2RenderingContext) => {
    const vertexShader = await shaderCreate({
        gl,
        type: 'vert',
        shaderName: 'rotate2DSimpleVertices'
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
            resolution: gl.getUniformLocation(program, 'u_resolution'),
            translation: gl.getUniformLocation(program, 'u_translation'),
            rotation: gl.getUniformLocation(program, 'u_rotation'),
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

    const useProgram = () => {
        gl.useProgram(program)
        gl.uniform2f(locations.uniforms.resolution, gl.canvas.width, gl.canvas.height)
        gl.uniform2fv(locations.uniforms.translation, [50, 50])
        const angleInDegrees = 20
        const angleInRadians = angleInDegrees * Math.PI / 180
        gl.uniform2fv(locations.uniforms.rotation, [Math.sin(angleInRadians), Math.cos(angleInRadians)])
        gl.uniform4f(locations.uniforms.color, Math.random(), Math.random(), Math.random(), 1)
        gl.bindVertexArray(vao)
    }

    return useProgram
}

export default glProgramBuildBase2DExample
