varying vec2 vUv;

// Day-night transition
uniform sampler2D uTextureDay;
uniform sampler2D uTextureNight;
uniform float uNightMix;

// Hover effect
uniform float uTime;
uniform float uIsHovered;

// Blink (light) effect
uniform bool uLightUp;

void main() {
    vec4 dayColor = texture2D(uTextureDay, vUv);
    vec4 nightColor = texture2D(uTextureNight, vUv);
    vec4 mixColor = mix(dayColor, nightColor, uNightMix);

    gl_FragColor = uLightUp ? vec4(1.0) : mixColor;
}