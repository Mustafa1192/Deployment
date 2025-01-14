import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../src/Auth/Register';
import Login from '../src/Auth/Login';
import Verify from '../src/Auth/Verify';
import Forget from '../src/Auth/Forget';
import LandingPage from '../src/Pages/Landing'; 
import HomePage from '../src/Pages/Home';
import Faculty from '../src/Pages/Faculty';
import Representative from '../src/Pages/Representative';
import AchievementsPage from '../src/Pages/Achievements';
import Syllabus from '../src/components/syllabus';
import Try from '../src/components/try';
import Notfound from '../src/components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route now points to Register */}
        <Route path="/" element={<Register />} /> 
        <Route path="/Login" element={<Login />} />
        <Route path="/Verify" element={<Verify />} />
        <Route path="/Forget" element={<Forget />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/representative" element={<Representative />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/syllabus/:semesterId/:unitId/:subjectId" element={<Syllabus />} />
        <Route path="/try" element={<Try />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
