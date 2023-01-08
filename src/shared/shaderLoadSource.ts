import axios from 'axios'

export const vertexShaderSources: Record<string, string | undefined> = {}
export const fragmentShaderSources: Record<string, string | undefined> = {}

const shaderLoadSource = (name: string, type: 'vert' | 'frag') => {
    if (type === 'frag' && fragmentShaderSources[name]) {
        return
    }
    if (type === 'vert' && vertexShaderSources[name]) {
        return
    }

    const basePath = type === 'vert' ? 'vertexShaders' : 'fragmentShaders'

    return axios
        .get(`/${basePath}/${name}.${type}`)
        .then((response) => {
            if (type === 'frag') {
                fragmentShaderSources[name] = response.data
                return
            }
            vertexShaderSources[name] = response.data
        })
}

export default shaderLoadSource
