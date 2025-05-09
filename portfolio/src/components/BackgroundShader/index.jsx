import React, { useRef, useMemo } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// 1) Definição do material com uniforms para as cores da paleta
const CustomPaletteMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(),
    uColorA: new THREE.Color(0.003, 0.086, 0.153),
    uColorB: new THREE.Color(0.5, 0.0, 1.0),
    uColorC: new THREE.Color(0.003, 0.086, 0.153),
    uColorD: new THREE.Color(0.0, 0.710, 1.0),
    uGridSize: 1.0
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
  `,
  // fragment shader adaptado do Shadertoy, usando as cores uniformes
  `
    #define S(a,b,t) smoothstep(a,b,t)
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform vec3 uColorD;
    varying vec2 vUv;
    
    mat2 Rot(float a){
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }
    
    vec2 hash(vec2 p){
      p = vec2(dot(p, vec2(2127.1,81.17)), dot(p, vec2(1269.5,283.37)));
      return fract(sin(p) * 43758.5453);
    }
    
    float noise(in vec2 p){
      vec2 i = floor(p), f = fract(p);
      vec2 u = f*f*(3.0 - 2.0*f);
      float n = mix(
        mix(dot(-1.0+2.0*hash(i+vec2(0,0)), f-vec2(0,0)),
            dot(-1.0+2.0*hash(i+vec2(1,0)), f-vec2(1,0)), u.x),
        mix(dot(-1.0+2.0*hash(i+vec2(0,1)), f-vec2(0,1)),
            dot(-1.0+2.0*hash(i+vec2(1,1)), f-vec2(1,1)), u.x),
        u.y
      );
      return 0.5 + 0.5 * n;
    }
    
    void main(){
      vec2 fragCoord = vUv * uResolution;
      vec2 uv = fragCoord / uResolution;
      float ratio = uResolution.x / uResolution.y;
      vec2 tuv = uv - 0.5;
    
      // rotação com ruído
      float degree = noise(vec2(uTime * 0.1, tuv.x * tuv.y));
      tuv.y *= 1.0/ratio;
      tuv *= Rot(radians((degree - 0.5) * 720.0 + 180.0));
      tuv.y *= ratio;
    
      // distorção em onda
      float freq = 5.0, amp = 30.0, speed = uTime * 2.0;
      tuv.x += sin(tuv.y * freq + speed) / amp;
      tuv.y += sin(tuv.x * freq * 1.5 + speed) / (amp * 0.5);
    
      // camadas com a paleta customizável
      vec3 layer1 = mix(uColorA, uColorB, S(-0.3, 0.2, (tuv * Rot(radians(-5.0))).x));
      vec3 layer2 = mix(uColorC, uColorD, S(-0.3, 0.2, (tuv * Rot(radians(-5.0))).x));
      vec3 finalComp = mix(layer1, layer2, S(0.5, -0.3, tuv.y));
    
      gl_FragColor = vec4(finalComp, 1.0);
    }
  `
)

extend({ CustomPaletteMaterial })

function ShaderPlane() {
  const matRef = useRef()
  const { size, viewport, clock } = useThree()

  // atualiza uniforms a cada frame
  useFrame(() => {
    if (matRef.current) {
      matRef.current.uTime = clock.getElapsedTime()
      matRef.current.uResolution.set(size.width, size.height)
    }
  })

  // escala para cobrir toda a viewport
  const scale = useMemo(
    () => [viewport.width, viewport.height, 1],
    [viewport.width, viewport.height]
  )

  return (
    <mesh scale={scale}>
      <planeGeometry args={[1, 1]} />
      <customPaletteMaterial ref={matRef} attach="material" />
    </mesh>
  )
}

export default function BackgroundShader() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 1, position: [0, 0, 1] }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <ShaderPlane/>
    </Canvas>
  )
}
