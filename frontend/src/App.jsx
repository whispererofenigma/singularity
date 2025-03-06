import { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import './App.css';
import MobiusScene from './components/mobiusStrip';

function App() {

  return (
    <div className='bg-black'>
      <MobiusScene />
    </div>


  )
}

export default App
