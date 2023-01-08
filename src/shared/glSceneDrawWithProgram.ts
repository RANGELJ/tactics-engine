import resizeCanvasToDisplaySize from '@/shared/resizeCanvasToDisplaySize'

type Args = {
    gl: WebGL2RenderingContext;
    useProgram: () => void;
}

const glSceneDrawWithProgram = ({
    gl,
    useProgram
}: Args) => {
    resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.clearColor(1, 1, 1, 0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    useProgram()

    const primitiveType = gl.TRIANGLES
    const offset2 = 0
    const vertexCount = 18
    gl.drawArrays(primitiveType, offset2, vertexCount)
}

export default glSceneDrawWithProgram
