type ShaderTypes = 'vec4'

type VertexShaderInput = {
    type: ShaderTypes;
    name: string;
}

export enum ShaderNodeTypes {
    VARIABLE_NAME,
    ASSIGNATION,
    VEC4_RGB_COLOR_CREATION,
}

type ShaderNodeVariableName = {
    type: ShaderNodeTypes.VARIABLE_NAME;
    name: string;
}

type ShaderNodeVec4Creation = {
    type: ShaderNodeTypes.VEC4_RGB_COLOR_CREATION;
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

type ShaderExpression = ShaderNodeVariableName | ShaderNodeVec4Creation

type ShaderNodeAssignation = {
    type: ShaderNodeTypes.ASSIGNATION;
    to: string;
    from: ShaderExpression;
}

export type ShaderNode = ShaderNodeAssignation
    | ShaderExpression

export type VertexShader = {
    inputs: VertexShaderInput[];
    main: ShaderNode[];
}

type FragmentShaderOutput = {
    type: ShaderTypes;
    name: string;
}

export type FragmentShader = {
    precision: 'highp';
    outputs: FragmentShaderOutput[];
    main: ShaderNode[];
}
