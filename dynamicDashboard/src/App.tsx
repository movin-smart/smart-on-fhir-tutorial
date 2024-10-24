// import React from 'react';
// import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// //import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/login';

// import './index.css';
// import Dashboard from './pages/dashboard';

// const App: React.FC = () => {

//   return (
//     <>
//     <Dashboard />
//     </>
//   );
// };

// export default App;

import React from 'react';
import Dashboard from './pages/dashboard';

const App: React.FC = () => {
    const fhirData = {}; // Replace with your actual data

    return (
        <div>
            <Dashboard fhirData={fhirData} />
        </div>
    );
};

export default App;
