import React from 'react'
import { ALLFBI } from "./"
import { Routes, Route } from 'react-router-dom'


/* 
    This is you entry point for your routes
*/
const Main = () => {
  return (
    <div>
      <nav>Welcome!</nav>
      <main>
        <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
        
      </main>
      <Routes>
        <Route path="/FBI" element={< ALLFBI />} />
      </Routes>
    </div>

  )
}

export default Main
