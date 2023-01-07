import { FragmentShader } from '@/types'
import fragmentShaderCreateSource from './fragmentShaderCreateSource'

type Args = {
    gl: WebGL2RenderingContext;
    fragmentShader: FragmentShader;
}

const fragmentShaderCreate = ({
    gl,
    fragmentShader
}: Args) => {
    const shader = gl.createShader(gl.FRAGMENT_SHADER)
    if (!shader) {
        throw new Error('Expecting a valid shader')
    }
    gl.shaderSource(shader, fragmentShaderCreateSource(fragmentShader))
    gl.compileShader(shader)
    const success: unknown = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

    if (success !== true) {
        gl.deleteShader(shader)
        throw new Error(`Fragment shader compilation error
        ${gl.getShaderInfoLog(shader)}
        Source: ${fragmentShaderCreateSource(fragmentShader)}
        `)
    }
    return shader
}

export default fragmentShaderCreate
