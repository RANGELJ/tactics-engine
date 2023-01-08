import shaderCreate from '@/shared/shaderCreate'
import glCreateProgram from '@/shared/glCreateProgram'

const setRectangle = (gl: WebGL2RenderingContext, x: number, y: number, width: number, height: number) => {
    const x1 = x
    const x2 = x + width
    const y1 = y
    const y2 = y + height

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2
    ]), gl.STATIC_DRAW)
}

const randomInt = (range: number) => {
    return Math.floor(Math.random() * range)
}

const glExampleRenderTriangles = async (gl: WebGL2RenderingContext) => {
    const vertexShader = await shaderCreate({
        gl,
        type: 'vert',
        shaderName: 'pixelsToClipSpace'
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
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
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
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
    gl.bindVertexArray(vao)

    for (let i = 0; i < 50; ++i) {
        setRectangle(
            gl,
            randomInt(300),
            randomInt(300),
            randomInt(300),
            randomInt(300)
        )
        gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1)

        const primitiveType = gl.TRIANGLES
        const offset2 = 0
        const vertexCount = 6
        gl.drawArrays(primitiveType, offset2, vertexCount)
    }
}

export default glExampleRenderTriangles
