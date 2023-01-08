<template>
    <div class="mainFrame">
        <canvas id="mainCanvas" />
        <div class="toolsPanel">
        </div>
    </div>
</template>

<script lang="ts" setup>
import glExampleSimple2DTranslation from '@/shared/glExampleSimple2DTranslation'
import { onMounted } from 'vue'

onMounted(() => {
    const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement
    const gl = canvas.getContext('webgl2')

    if (!gl) {
        return
    }
    console.clear()

    glExampleSimple2DTranslation(gl)
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
