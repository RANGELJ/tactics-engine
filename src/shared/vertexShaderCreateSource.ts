import { VertexShader, VertexShaderStatementTypes } from '@/types'

const vertexShaderCreateSource = (vertexShader: VertexShader) => `
#version 300 es

${vertexShader.inputs.map((input) => `in ${input.type} ${input.name};`).join('\n')}

void main() {
    ${vertexShader.main.map((statement) => {
        switch (statement.type) {
        case VertexShaderStatementTypes.ASSIGNATION:
            return `${statement.to} = ${statement.from};`
        default:
            throw new Error(`Unsupported statement type: ${statement.type}`)
        }
    }).join('\n')}
}
`.trim()

export default vertexShaderCreateSource
