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

import React, { useEffect, useState } from 'react';
import Dashboard from './pages/dashboard';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [fhirData, setFhirData] = useState<any>(null);

  useEffect(() => {
    // Extract authorization code from URL
    const getAuthCodeFromUrl = () => {
      const query = new URLSearchParams(window.location.search);
      const code = query.get('code');
      if (code) {
        exchangeCodeForToken(code);
      }
    };

    const exchangeCodeForToken = async (code: string) => {
      const tokenUrl = 'https://fhir.sandboxcerner.com/oauth2/token';
      const clientId = 'e67effc2-ddb1-4630-b65f-18f45de454c1';  // Your client ID
      const redirectUri = 'https://movin-smart.github.io/smart-on-fhir-tutorial/example-smart-app/';  // Your redirect URI

      const data = new URLSearchParams();
      data.append('grant_type', 'authorization_code');
      data.append('code', code);
      data.append('redirect_uri', redirectUri);
      data.append('client_id', clientId);

      try {
        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data.toString(),
        });

        const tokenData = await response.json();
        setToken(tokenData.access_token);

        // Fetch FHIR data now that we have the access token
        fetchFhirData(tokenData.access_token);
      } catch (error) {
        console.error('Error exchanging code for token:', error);
      }
    };

    const fetchFhirData = async (accessToken: string) => {
      const fhirUrl = 'https://fhir.sandboxcerner.com/dstu2/123456/Patient'; // Adjust to the appropriate FHIR endpoint

      try {
        const response = await fetch(fhirUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        const fhirData = await response.json();
        setFhirData(fhirData);
      } catch (error) {
        console.error('Error fetching FHIR data:', error);
      }
    };

    getAuthCodeFromUrl();
  }, []);

  return (
    <div>
      {fhirData ? (
        <Dashboard fhirData={fhirData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
