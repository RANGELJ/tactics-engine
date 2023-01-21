type Args = {
    left: number;
    right: number;
    bottom: number;
    top: number;
    near: number;
    far: number;
}

const matrix3DGetOrthographic = ({
    bottom,
    far,
    left,
    near,
    right,
    top
}: Args) => [
    2 / (right - left), 0, 0, 0,
    0, 2 / (top - bottom), 0, 0,
    0, 0, 2 / (near - far), 0,

    (left + right) / (left - right),
    (bottom + top) / (bottom - top),
    (near + far) / (near - far),
    1
]

export default matrix3DGetOrthographic
