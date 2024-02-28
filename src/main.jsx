import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Experience from './Experience.jsx'
import { Canvas } from '@react-three/fiber'
import Interface from './Interface.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Interface />
    <Canvas camera={{
      position: [5, 2, 10],
      fov: 60
    }}>
      <Experience />
    </Canvas>
  </React.StrictMode>,
)
