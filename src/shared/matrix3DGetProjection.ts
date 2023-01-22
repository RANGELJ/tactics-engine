type Args = {
    fieldOfViewInRadians: number;
    aspect: number;
    near: number;
    far: number;
}

const matrix3DGetProjection = ({
    fieldOfViewInRadians,
    aspect,
    far,
    near
}: Args) => {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians)
    const rangeInv = 1.0 / (near - far)

    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
    ]
}

export default matrix3DGetProjection
