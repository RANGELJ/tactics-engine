<template>
    <div class="mainFrame">
        <canvas id="mainCanvas" />
        <div class="toolsPanel">
            <button @click="start">Start</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    ShaderNodeTypes
} from '@/types'
import vertexShaderCreate from '@/shared/vertexShaderCreate'
import fragmentShaderCreate from '@/shared/fragmentShaderCreate'
import glCreateProgram from '@/shared/glCreateProgram'

const start = () => {
    const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement
    const gl = canvas.getContext('webgl2')

    if (!gl) {
        return
    }
    console.clear()
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
    const positions = [
        0, 0,
        0, 0.5,
        0.7, 0
    ]
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

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)
    gl.bindVertexArray(vao)

    const primitiveType = gl.TRIANGLES
    const offset2 = 0
    const count = 3
    gl.drawArrays(primitiveType, offset2, count)
}
</script>

<style scoped>
.mainFrame {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    display: grid;
    grid-template-columns: 20px 1fr 20px 1fr 20px;
    grid-template-rows: 20px 1fr 20px 1fr 20px;
}

.toolsPanel {
    grid-column-start: 4;
    grid-row-start: 2;
}

#mainCanvas {
    grid-column-start: 2;
    grid-row-start: 2;
    width: 100%;
    height: 100%;
}
</style>
