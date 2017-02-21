/**
 * @author Ningxia Zhang
 *
 * Duo Tone effects
 *
 */

THREE.DuoToneShader = {

  uniforms: {

    "tDiffuse": { value: null }
    // "amount":   { value: 0.005 },
    // "angle":    { value: 0.0 }

  },

  vertexShader: [

    "varying vec2 vUv;",

    "void main() {",

      "vUv = uv;",
      "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

    "}"

  ].join( "\n" ),

  fragmentShader: [

    "uniform sampler2D tDiffuse;",
    "varying vec2 vUv;",

    "void main() {",

      // Black and white first
      "vec4 original = texture2D( tDiffuse, vUv );",
      "vec3 luma = vec3( 0.299, 0.587, 0.114 );",
      "float v = dot( original.xyz, luma );",
      "vec3 color = vec3(v);",

      // Increase contrast
      "float contrast = 0.5;",
      "color.rgb = (color.rgb - 0.5) / (1.0 - contrast) + 0.5;",
      "color.rgb += 0.4;",

      "vec3 dark = vec3(0.474,0.297,1.000);", // green
      "vec3 bright = vec3(0.912,0.830,0.785);", // blue

      "vec3 colorA = vec3(0.335,0.091,0.912);",
      "vec3 colorB = vec3(1.000,0.539,0.530);",
      "float pct = vUv.x;",
      "vec3 gradiant = mix(colorA, colorB, pct);",
      // "vec3 gradiant = mix(colorA, colorB, )"

      // "color = color * bright;",
      // "color = 1.0 - (1.0 - color.rgb)*(1.0 - dark.rgb);",

      "color = mix(dark, bright, color.r);",

      "gl_FragColor = vec4( color, original.w );",

    "}"

  ].join( "\n" )

};
