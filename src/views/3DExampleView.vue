<template>
    <div class="mainFrame">
        <div class="canvasContainer">
            <canvas id="mainCanvas" />
        </div>
        <div class="toolsPanel">
            <span class="inputLabel">Field of view in radians</span>
            <input
                type="range"
                min="0"
                max="300"
                v-model="fieldOfViewValue"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import glProgramBuild3D, { SceneProgram } from '@/shared/glProgramBuild3D'
import angleDegreesToRadians from '@/shared/angleDegreesToRadians'
import { onMounted, ref, watch } from 'vue'

let gl: WebGL2RenderingContext | undefined
let sceneProgram: SceneProgram | undefined

const fieldOfViewValue = ref(60)

const updateScene = () => {
    if (!sceneProgram) {
        return
    }
    sceneProgram.setFieldOfViewInRadians(
        angleDegreesToRadians(fieldOfViewValue.value)
    )
    sceneProgram.drawScene()
}

watch([
    fieldOfViewValue
], () => {
    updateScene()
})

onMounted(async () => {
    const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement
    gl = canvas.getContext('webgl2') ?? undefined

    if (!gl) {
        return
    }

    sceneProgram = await glProgramBuild3D(gl)

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
