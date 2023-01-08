#version 300 es

in vec2 a_position;

uniform vec2 u_resolution;
uniform vec2 u_translation;
uniform vec2 u_rotation;

vec2 rotate(vec2 position) {
    return vec2(
        position.x * u_rotation.y + position.y * u_rotation.x,
        position.y * u_rotation.y - position.x * u_rotation.x
    );
}

vec4 convertToClipSpace(vec2 position) {
    vec2 zeroToOne = position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;

    return vec4(clipSpace * vec2(1, -1), 0, 1);
}

void main() {
    vec2 position = rotate(a_position) + u_translation;

    gl_Position = convertToClipSpace(position);
}