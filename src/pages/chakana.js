import React, { useState, useRef, useEffect, Suspense } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Helmet } from "react-helmet"

import {
  Canvas,
  useFrame,
  extend,
  useThree,
  useRender,
} from "react-three-fiber"
import { useSpring, a } from "react-spring/three"
import { PositionalAudio, Text, Stars } from "drei"

import "./style.css"

extend({ OrbitControls })

const SpaceShip = () => {
  const [model, setModel] = useState()

  useEffect(() => {
    new GLTFLoader().load("/apl.gltf", setModel)
  })

  return model ? <primitive object={model.scene} /> : null
}

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()
  //useFrame allows us to re-render/update rotation on each frame

  useRender(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls autoRotate args={[camera, gl.domElement]} ref={orbitRef} />
  )
}

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[100, 100]} />
    <meshPhysicalMaterial attach="material" color="white" />
  </mesh>
)

const Box = () => {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "hotpink" : "gray",
  })

  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />

      <Suspense fallback={null}>
        <PositionalAudio url="https://assets.ctfassets.net/mai25em38k9q/2qHoL9NrIDZWOJylxocaDX/cf74660368fceb495674db96b500267e/MFL-Flaming-Lynch.mp3" />
      </Suspense>
    </a.mesh>
  )
}

export default () => {
  const isBrowser = typeof window !== "undefined"

  return (
    <>
      <Helmet>
        <body className="domFiber" />
      </Helmet>
      {isBrowser && (
        <Canvas
          camera={{ position: [0, 15, 0] }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true
            gl.shadowMap.type = THREE.PCFSoftShadowMap
          }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[15, 20, 5]} penumbra={1} castShadow />
          {/* <fog attach="fog" args={["black", 10, 25]} />*/}
          <Controls />
          {/* <Box /> */}
          {/*<Plane />*/}
          <SpaceShip />
        </Canvas>
      )}
    </>
  )
}
