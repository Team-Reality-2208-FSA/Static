import React from 'react'
import { AllCampuses, AllStudents, SingleCampus, SingleStudent } from "./index"
import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

/* 
    This is you entry point for your routes
*/
const Main = () => {
  return (
    <div>
      <nav>Welcome!</nav>
      <main>
        <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
        <div className="links">
          <Link className="link" to="/campuses">Campuses</Link>
          <Link className="link" to="/students">Students</Link>
        </div>
      </main>
      <Routes>
        <Route path="/campuses" element={<AllCampuses />} />
        <Route path="/students" element={<AllStudents />} />
        <Route path="/campuses/:campId" element={<SingleCampus />} />
        <Route path="/students/:stuId" element={<SingleStudent />} />
      </Routes>
    </div>

  )
}

export default Main
