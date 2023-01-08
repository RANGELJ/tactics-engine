import { fragmentShaderSources, vertexShaderSources } from './shaderLoadSource'

const shaderSourceGet = (name: string, type: 'vert' | 'frag') => {
    if (type === 'vert') {
        return vertexShaderSources[name]
    }
    return fragmentShaderSources[name]
}

export default shaderSourceGet
