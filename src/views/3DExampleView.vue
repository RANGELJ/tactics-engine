<template>
    <div class="mainFrame">
        <canvas id="mainCanvas" />
        <div class="toolsPanel">
            <input
                type="range"
                min="0"
                max="100"
                v-model="translationInputValue"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import glSceneDrawWithProgram from '@/shared/glSceneDrawWithProgram'
import glProgramBuild3D, { SceneProgram } from '@/shared/glProgramBuild3D'
import { onMounted, ref, watch } from 'vue'

let gl: WebGL2RenderingContext | undefined
let sceneProgram: SceneProgram | undefined

const drawScene = () => {
    if (!sceneProgram || !gl) {
        return
    }
    glSceneDrawWithProgram({
        gl,
        useProgram: sceneProgram.useProgram
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

const translationInputValue = ref(0)

const updateScene = () => {
    if (!sceneProgram) {
        return
    }
    sceneProgram.translationXSet(translationInputValue.value)
    drawScene()
}

watch(translationInputValue, () => {
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
