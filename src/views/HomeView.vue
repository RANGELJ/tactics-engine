<template>
    <div class="mainFrame">
        <canvas id="mainCanvas" />
        <div class="toolsPanel">
            <button @click="start">Start</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const start = () => {
    const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement
    const context = canvas.getContext('2d')

    if (!context) {
        return
    }

    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
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
