import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Experience from './Experience.jsx'
import { Canvas } from '@react-three/fiber'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Canvas camera={{
      position: [4, 2, 4],
      fov: 60
    }}>
      <Experience />
    </Canvas>
  </React.StrictMode>,
)
