import {
    ShaderNodeTypes
} from '@/types'
import shaderCreate from '@/shared/shaderCreate'
import glCreateProgram from '@/shared/glCreateProgram'

type Args = {
    gl: WebGL2RenderingContext;
    positions: number[];
}

const glRenderTriangles = async ({
    gl,
    positions
}: Args) => {
    const vertexShader = await shaderCreate({
        gl,
        type: 'vert',
        shaderName: 'directVertices'
    })
    const fragmentShader = await shaderCreate({
        gl,
        type: 'frag',
        shaderName: 'allPurpleVertices'
    })

    const program = glCreateProgram({
        gl,
        vertexShader,
        fragmentShader
    })

    // This does not goes on render loop
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const positionBuffer = gl.createBuffer()

    if (!positionBuffer) {
        throw new Error('Could not create position buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    const vao = gl.createVertexArray()

    if (!vao) {
        throw new Error('Could not create vertex array object')
    }

    gl.bindVertexArray(vao)
    gl.enableVertexAttribArray(positionAttributeLocation)

    const size = 2
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0

    gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
    )

    gl.clearColor(1, 1, 1, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)
    gl.bindVertexArray(vao)

    const primitiveType = gl.TRIANGLES
    const offset2 = 0
    const vertexCount = positions.length / size
    gl.drawArrays(primitiveType, offset2, vertexCount)
}

export default glRenderTriangles
