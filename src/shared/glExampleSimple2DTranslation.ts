import shaderCreate from '@/shared/shaderCreate'
import glCreateProgram from '@/shared/glCreateProgram'
import resizeCanvasToDisplaySize from '@/shared/resizeCanvasToDisplaySize'

const glExampleSimple2DTranslation = async (gl: WebGL2RenderingContext) => {
    resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

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
    const uniformResolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const uniformTranslationLocation = gl.getUniformLocation(program, 'u_translation')
    const uniformRotationLocation = gl.getUniformLocation(program, 'u_rotation')
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const colorLocation = gl.getUniformLocation(program, 'u_color')

    const positionBuffer = gl.createBuffer()

    if (!positionBuffer) {
        throw new Error('Could not create position buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    const vao = gl.createVertexArray()

    if (!vao) {
        throw new Error('Could not create vertex array object')
    }

    gl.bindVertexArray(vao)
    gl.enableVertexAttribArray(positionAttributeLocation)

    const size = 2
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0

    gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
    )

    gl.clearColor(1, 1, 1, 0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.useProgram(program)
    gl.uniform2f(uniformResolutionLocation, gl.canvas.width, gl.canvas.height)
    gl.uniform2fv(uniformTranslationLocation, [50, 50])
    const angleInDegrees = 20
    const angleInRadians = angleInDegrees * Math.PI / 180
    gl.uniform2fv(uniformRotationLocation, [Math.sin(angleInRadians), Math.cos(angleInRadians)])
    gl.bindVertexArray(vao)

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

    gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1)

    const primitiveType = gl.TRIANGLES
    const offset2 = 0
    const vertexCount = 18
    gl.drawArrays(primitiveType, offset2, vertexCount)
}

export default glExampleSimple2DTranslation
