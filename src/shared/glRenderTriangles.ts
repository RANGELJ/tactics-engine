import {
    ShaderNodeTypes
} from '@/types'
import vertexShaderCreate from '@/shared/vertexShaderCreate'
import fragmentShaderCreate from '@/shared/fragmentShaderCreate'
import glCreateProgram from '@/shared/glCreateProgram'

type Args = {
    gl: WebGL2RenderingContext;
    positions: number[];
}

const glRenderTriangles = ({
    gl,
    positions
}: Args) => {
    const vertexShader = vertexShaderCreate({
        gl,
        vertexShader: {
            inputs: [{
                name: 'a_position',
                type: 'vec4'
            }],
            main: [
                {
                    type: ShaderNodeTypes.ASSIGNATION,
                    from: {
                        type: ShaderNodeTypes.VARIABLE_NAME,
                        name: 'a_position'
                    },
                    to: 'gl_Position'
                }
            ]
        }
    })
    const fragmentShader = fragmentShaderCreate({
        gl,
        fragmentShader: {
            precision: 'highp',
            outputs: [
                { type: 'vec4', name: 'outColor' }
            ],
            main: [
                {
                    type: ShaderNodeTypes.ASSIGNATION,
                    from: {
                        type: ShaderNodeTypes.VEC4_RGB_COLOR_CREATION,
                        red: 1,
                        green: 0,
                        blue: 0.5,
                        alpha: 0
                    },
                    to: 'outColor'
                }
            ]
        }
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
