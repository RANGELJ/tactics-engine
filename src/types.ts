type VertexShaderInput = {
    type: 'vec4';
    name: string;
}

export enum VertexShaderStatementTypes {
    ASSIGNATION
}

type VertexShaderStatementAssignation = {
    type: VertexShaderStatementTypes.ASSIGNATION;
    to: string;
    from: string;
}

type VertexShaderStatement = VertexShaderStatementAssignation

export type VertexShader = {
    inputs: VertexShaderInput[];
    main: VertexShaderStatement[];
}
