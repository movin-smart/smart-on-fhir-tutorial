// import React from 'react';
// import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// //import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/login';
// import Dashboard from './pages/dashboard';
// import './index.css';

// const App: React.FC = () => {

//   return (
//     <>
//     <Dashboard />
//     </>
//   );
// };

// export default App;




// import React, { useEffect, useState } from "react";
// import FHIR from "fhirclient";

// const App = () => {
//   const [patient, setPatient] = useState(null);

//   useEffect(() => {
//     // Initialize OAuth2 flow and retrieve patient data
//     FHIR.oauth2
//       .init({
//         clientId: 'e67effc2-ddb1-4630-b65f-18f45de454c1', // Your client ID
//         scope: 'patient/Patient.read patient/Observation.read launch online_access openid profile',
//         iss: 'https://fhir-open.cerner.com/dstu2/e67effc2-ddb1-4630-b65f-18f45de454c1/', // Cerner's FHIR server URL
//         redirectUri: 'https://movin-smart.github.io/smart-on-fhir-tutorial/example-smart-app/', // Your Redirect URI
//       })
//       .then((client) => {
//         // Fetch patient details using the client
//         return client.request(`Patient/${client.patient.id}`);
//       })
//       .then((patientData) => {
//         // Set the retrieved patient data in state
//         setPatient(patientData);
//         console.log("Patient data:", patientData);
//       })
//       .catch((error) => {
//         console.error("Error fetching patient data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       {patient ? (
//         <div>
//           {/* <h1>{patient.name[0].text}</h1>
//           <p>Gender: {patient.gender}</p>
//           <p>DOB: {patient.birthDate}</p> */}
//           {/* Render other patient details */}
//         </div>
//       ) : (
//         <p>Loading patient data...</p>
//       )}
//     </div>
//   );
// };

// export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

