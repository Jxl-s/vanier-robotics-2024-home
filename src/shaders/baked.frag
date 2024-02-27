varying vec2 vUv;

// Day-night transition
uniform sampler2D uTextureDay;
uniform sampler2D uTextureNight;
uniform float uNightMix;

// Hover effect
uniform float uTime;
uniform bool uIsHovered;

// Blink (light) effect
uniform float uLightUp;

void main() {
    // Light up effect
    if(uLightUp > 0.0) {
        gl_FragColor = vec4(vec3(uLightUp), 1.0);
        return;
    }

    // Day-night transition
    vec4 dayColor = texture2D(uTextureDay, vUv);
    vec4 nightColor = texture2D(uTextureNight, vUv);
    vec4 mixColor = mix(dayColor, nightColor, uNightMix);

    // Hover effect
    if(uIsHovered) {
        mixColor += abs(sin(uTime * 2.0)) * 0.2;
    }

    gl_FragColor = mixColor;
}