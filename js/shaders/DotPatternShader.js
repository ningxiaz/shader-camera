/**
 * @author Ningxia Zhang
 *
 * Dot Pattern Shader
 * Render grid of dots on top of the image
 *
 * density: density of the grid
 * size: size of dots
 */

THREE.DotPatternShader = {

  uniforms: {

    "tDiffuse": { value: null },
    "density":   { value: 60. },
    "size":    { value: 0.1 }
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
    "uniform float density;",
    "uniform float size;",
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

      "vec4 original = texture2D( tDiffuse, vUv );",
      "vec3 color = original.xyz;",
      "vec2 grid = vUv;",

      "grid = tile(grid, density);",

      "color += circle(grid, size);",

      "gl_FragColor = vec4( color, original.w );",

    "}"

  ].join( "\n" )

};
