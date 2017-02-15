/**
 * @author Ningxia Zhang
 *
 * RGB Shift Shader
 * Shifts red and blue channels from center in opposite directions
 * Ported from http://kriss.cx/tom/2009/05/rgb-shift/
 * by Tom Butterworth / http://kriss.cx/tom/
 *
 * amount: shift distance (1 is width of input)
 * angle: shift angle in radians
 */

THREE.PatternShader = {

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

    "float circle(in vec2 _st, in float _radius){",
        "vec2 l = _st-vec2(0.5);",
        "return 1.-smoothstep(_radius-(_radius*0.05), _radius+(_radius*0.05), dot(l,l)*4.0);",
    "}",

    "vec2 tile(vec2 _st, float _zoom){",
        "_st *= _zoom;",
        "return fract(_st);",
    "}",

    "void main() {",

      // Black and white first
      "vec4 original = texture2D( tDiffuse, vUv );",
      "vec3 luma = vec3( 0.299, 0.587, 0.114 );",
      "float v = dot( original.xyz, luma );",
      "vec3 color = vec3(v);",
      "vec2 grid = vUv;",

      "grid = tile(grid, 60.0);",

      "color += circle(grid, 0.1);",

      "gl_FragColor = vec4( color, original.w );",

    "}"

  ].join( "\n" )

};
