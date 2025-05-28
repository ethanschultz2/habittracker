import React from 'react';
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "../src/Components/Navbar/Navbar";
import Home from "../src/Components/Home/Home";
import HabitForm from "../src/Components/HabitForm/HabitForm";
import SignUp from "../src/Components/SignUp/SignUp";
import Login from "../src/Components/Login/Login";
import Verify from "../src/Components/Verification/Verify";
import HabitList from "../src/Components/HabitList/HabitList";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/form' element={<HabitForm/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/list' element={<HabitList/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
