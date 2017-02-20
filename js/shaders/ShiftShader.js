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

THREE.ShiftShader = {

  uniforms: {

    "tDiffuse": { value: null },
    "type":   { value: "irregular" },
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

    "vec2 be_irregular(vec2 p) {",
      "if(p.x > 0.3) p.x -= 0.03;",
      "if(p.x > 0.62) p.x -= 0.04;",
      "if(p.x > 0.7) p.x -= 0.04;",
      "if(p.x > 0.76) p.x -= 0.04;",
      "if(p.x > 0.8) p.x -= 0.03;",

      "return p;",
    "}",

    "vec2 shift_xx(vec2 p, float density, float distance) {",
      "p.x += (step(1.0, mod(density*p.x, 2.))*2. - 1.)*distance;",

      "return p;",
    "}",

    "vec2 shift_yy(vec2 p, float density, float distance) {",
      "p.y += (step(1.0, mod(density*p.y, 2.))*2. - 1.)*distance;",

      "return p;",
    "}",

     "vec2 shift_xy(vec2 p, float density, float distance) {",
      "p.y += (step(1.0, mod(density*p.x, 2.))*2. - 1.)*distance;",

      "return p;",
    "}",

    "void main() {",


      "vec2 p = vUv;",

      "p = shift_xx(p, 24., 0.04);",
      // "p = shift_xy(p, 24., 0.01);",
      // "p = shift_xx(p, 100., 0.01);",
      // "p = shift_yy(p, 24., 0.03);",

      "vec4 shifted  = texture2D( tDiffuse, p );",

      // black and white
      "shifted.xyz += 0.3;",
      "vec3 luma = vec3( 0.299, 0.587, 0.114 );",
      "float v = dot( shifted.xyz, luma );",
      "vec3 color = vec3(v);",

      "gl_FragColor = vec4( color, shifted.w );",

    "}"

  ].join( "\n" )

};
