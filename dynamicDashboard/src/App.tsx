import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import './index.css';

const App: React.FC = () => {

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     <Route path="*" element={<Login />} /> 
    //   </Routes>
    // </Router>

    <>

    <Dashboard />
    </>
  );
};

export default App;

