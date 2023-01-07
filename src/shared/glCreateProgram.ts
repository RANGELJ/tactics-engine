type Args = {
    gl: WebGL2RenderingContext;
    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;
}

const glCreateProgram = ({
    gl,
    vertexShader,
    fragmentShader
}: Args) => {
    const program = gl.createProgram()
    if (!program) {
        throw new Error('Failed to create program')
    }
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    const success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (success !== true) {
        gl.deleteProgram(program)
        throw new Error(`Error linking program: ${gl.getProgramInfoLog(program)}`)
    }
    return program
}

export default glCreateProgram
