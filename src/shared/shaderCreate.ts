import shaderLoadSource from './shaderLoadSource'
import shaderSourceGet from './shaderSourceGet'

type Args = {
    gl: WebGL2RenderingContext;
    type: 'vert' | 'frag';
    shaderName: string;
}

const shaderCreate = async ({
    gl,
    shaderName,
    type
}: Args) => {
    const shader = gl.createShader(type === 'vert' ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER)
    if (!shader) {
        throw new Error('Expecting a valid shader')
    }

    await shaderLoadSource(shaderName, type)
    const shaderSource = shaderSourceGet(shaderName, type)

    if (!shaderSource) {
        throw new Error(`Expecting a valid shader source for shader ${shaderName}`)
    }
    gl.shaderSource(shader, shaderSource)
    gl.compileShader(shader)
    const success: unknown = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

    if (success !== true) {
        gl.deleteShader(shader)
        throw new Error(`Fragment shader compilation error
        ${gl.getShaderInfoLog(shader)}
        source: ${shaderSource}
    `)
    }

    return shader
}

export default shaderCreate
