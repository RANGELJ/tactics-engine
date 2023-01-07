import { ShaderNode, ShaderNodeTypes } from '@/types'

const shaderNodeCreateSource = (node: ShaderNode): string => {
    switch (node.type) {
    case ShaderNodeTypes.ASSIGNATION:
        return `${node.to} = ${shaderNodeCreateSource(node.from)};`
    case ShaderNodeTypes.VEC4_RGB_COLOR_CREATION:
        return `vec4(${node.red}, ${node.green}, ${node.blue}, ${node.alpha})`
    case ShaderNodeTypes.VARIABLE_NAME:
        return node.name
    }
}

export default shaderNodeCreateSource
