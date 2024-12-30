import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import UserList from './userList'
import './App.css'
import PositionList from './positionList'
import Nav from './Nav/nav';
import NewTeacher from './newTeacher'
import NewTeacherPosition from './newPosition';
function App() {


  return (
    <>
      <Nav />
      <Routes>
        <Route
          path='/'
          element={<UserList />} />
        <Route
          path='/teacherPosition'
          element={<PositionList />} />
        <Route path="/teachers/create"
          element={<NewTeacher />} />
           <Route path="/position/create"
          element={<NewTeacherPosition/>} />
      </Routes>

    </>
  )
}

export default App
