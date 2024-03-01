import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Experience from './Experience.jsx'
import { Canvas } from '@react-three/fiber'
import Interface from './Interface.jsx'
import LoadingScreen from "./LoadingScreen.jsx"
import { useAssetStore } from './stores/useAssetStore.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadingScreen>
      <Interface />
      <Canvas camera={{
        position: [5, 2, 10],
        fov: 60
      }}
        // Necessary to skip the spike
        onCreated={() => useAssetStore.setState({ isCreated: true })}
      >
        <Experience />
      </Canvas>
    </LoadingScreen>
  </React.StrictMode>,
)
