import type { FragmentShader } from '@/types'
import shaderNodeCreateSource from '@/shared/shaderNodeCreateSource'

const fragmentShaderCreateSource = (fragmentShader: FragmentShader) => `
#version 300 es
precision ${fragmentShader.precision} float;

${fragmentShader.outputs.map((output) => `out ${output.type} ${output.name};`).join('\n')}

void main() {
    ${fragmentShader.main.map(shaderNodeCreateSource).join('\n')}
}
`.trim()

export default fragmentShaderCreateSource
