import { VertexShader } from '@/types'
import vertexShaderCreateSource from './vertexShaderCreateSource'

type Args = {
    gl: WebGL2RenderingContext;
    vertexShader: VertexShader;
}

const vertexShaderCreate = ({
    gl,
    vertexShader
}: Args) => {
    const shader = gl.createShader(gl.VERTEX_SHADER)
    if (!shader) {
        throw new Error('Expecting a valid shader')
    }
    gl.shaderSource(shader, vertexShaderCreateSource(vertexShader))
    gl.compileShader(shader)
    const success: unknown = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

    if (success !== true) {
        gl.deleteShader(shader)
        throw new Error(`Vertex shader compilation error ${gl.getShaderInfoLog(shader)}`)
    }

    return shader
}

export default vertexShaderCreate
