<template>
    <div class="mainFrame">
        <canvas id="mainCanvas" />
        <div class="toolsPanel">
            <input
                type="range"
                min="0"
                max="500"
                v-model="translationXInputValue"
            />
            <input
                type="range"
                min="0"
                max="500"
                v-model="translationYInputValue"
            />
            <input
                type="range"
                min="0"
                max="180"
                v-model="rotationXInputValue"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import glSceneDrawWithProgram from '@/shared/glSceneDrawWithProgram'
import glProgramBuild3D, { SceneProgram } from '@/shared/glProgramBuild3D'
import angleDegreesToRadians from '@/shared/angleDegreesToRadians'
import { onMounted, ref, watch } from 'vue'

let gl: WebGL2RenderingContext | undefined
let sceneProgram: SceneProgram | undefined

const drawScene = () => {
    if (!sceneProgram || !gl) {
        return
    }
    glSceneDrawWithProgram({
        gl,
        useProgram: sceneProgram.useProgram,
        vertexCount: sceneProgram.vertexCount
    })
}

onMounted(async () => {
    const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement
    gl = canvas.getContext('webgl2') ?? undefined

    if (!gl) {
        return
    }

    sceneProgram = await glProgramBuild3D(gl)

    drawScene()
})

const translationXInputValue = ref(0)
const translationYInputValue = ref(0)
const rotationXInputValue = ref(0)

const updateScene = () => {
    if (!sceneProgram) {
        return
    }
    sceneProgram.setTranslation(
        translationXInputValue.value,
        translationYInputValue.value,
        0
    )
    sceneProgram.setRotation(
        angleDegreesToRadians(rotationXInputValue.value),
        0,
        0
    )
    drawScene()
}

watch([
    translationXInputValue,
    translationYInputValue,
    rotationXInputValue
], () => {
    updateScene()
})
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
