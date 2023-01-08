import resizeCanvasToDisplaySize from '@/shared/resizeCanvasToDisplaySize'
import gl2DFExampleSetupScene from '@/shared/gl2DFExampleSetupScene'

type Args = {
    program: WebGLProgram;
    gl: WebGL2RenderingContext;
    locations: Awaited<ReturnType<typeof gl2DFExampleSetupScene>>['locations'];
    vao: WebGLVertexArrayObject;
}

const gl2DFExampleDrawScene = ({
    program,
    gl,
    locations,
    vao
}: Args) => {
    resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.clearColor(1, 1, 1, 0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.useProgram(program)
    gl.uniform2f(locations.uniforms.resolution, gl.canvas.width, gl.canvas.height)
    gl.uniform2fv(locations.uniforms.translation, [50, 50])
    const angleInDegrees = 20
    const angleInRadians = angleInDegrees * Math.PI / 180
    gl.uniform2fv(locations.uniforms.rotation, [Math.sin(angleInRadians), Math.cos(angleInRadians)])
    gl.bindVertexArray(vao)
    gl.uniform4f(locations.uniforms.color, Math.random(), Math.random(), Math.random(), 1)

    const primitiveType = gl.TRIANGLES
    const offset2 = 0
    const vertexCount = 18
    gl.drawArrays(primitiveType, offset2, vertexCount)
}

export default gl2DFExampleDrawScene
