import { VertexShader } from '@/types'
import shaderNodeCreateSource from '@/shared/shaderNodeCreateSource'

const vertexShaderCreateSource = (vertexShader: VertexShader) => `
#version 300 es

${vertexShader.inputs.map((input) => `in ${input.type} ${input.name};`).join('\n')}

void main() {
    ${vertexShader.main.map(shaderNodeCreateSource).join('\n')}
}
`.trim()

export default vertexShaderCreateSource
