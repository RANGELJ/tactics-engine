<template>
    <div class="mainFrame">
        <div class="canvasContainer">
            <canvas id="mainCanvas" />
        </div>
        <div class="toolsPanel">
            <span class="inputLabel">Fudge factor</span>
            <input
                type="range"
                min="0"
                max="300"
                v-model="fudgeFactorInputValue"
            />
            <span class="inputLabel">Translation X</span>
            <input
                type="range"
                min="0"
                max="500"
                v-model="translationXInputValue"
            />
            <span class="inputLabel">Translation Y</span>
            <input
                type="range"
                min="0"
                max="500"
                v-model="translationYInputValue"
            />
            <span class="inputLabel">Translation Z</span>
            <input
                type="range"
                min="0"
                max="500"
                v-model="translationZInputValue"
            />
            <span class="inputLabel">Rotation X</span>
            <input
                type="range"
                min="0"
                max="360"
                v-model="rotationXInputValue"
            />
            <span class="inputLabel">Rotation Y</span>
            <input
                type="range"
                min="0"
                max="360"
                v-model="rotationYInputValue"
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

const fudgeFactorInputValue = ref(100)
const translationXInputValue = ref(0)
const translationYInputValue = ref(0)
const translationZInputValue = ref(0)
const rotationXInputValue = ref(0)
const rotationYInputValue = ref(0)

const updateScene = () => {
    if (!sceneProgram) {
        return
    }
    sceneProgram.setFudgeFactor(
        fudgeFactorInputValue.value / 100
    )
    sceneProgram.setTranslation(
        translationXInputValue.value,
        translationYInputValue.value,
        translationZInputValue.value
    )
    sceneProgram.setRotation(
        angleDegreesToRadians(rotationXInputValue.value),
        angleDegreesToRadians(rotationYInputValue.value),
        0
    )
    drawScene()
}

watch([
    fudgeFactorInputValue,
    translationXInputValue,
    translationYInputValue,
    translationZInputValue,
    rotationXInputValue,
    rotationYInputValue
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    padding-left: 10px;
    border-width: 1px;
    border-style: dashed;
}

.canvasContainer {
    grid-column-start: 2;
    grid-row-start: 2;
    display: flex;
    border-width: 1px;
    border-style: dashed;
}

#mainCanvas {
    width: 100%;
    height: 100%;
}

.inputLabel {
    font-size: 14px;
    font-weight: 700;
}
</style>
