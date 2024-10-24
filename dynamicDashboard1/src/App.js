import { jsx as _jsx } from "react/jsx-runtime";
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
// import React, { useEffect, useState } from 'react';
// import Dashboard from './pages/dashboard';
// const App: React.FC = () => {
//   const [token, setToken] = useState<string | null>(null);
//   const [fhirData, setFhirData] = useState<any>(null);
//   const clientId = 'e67effc2-ddb1-4630-b65f-18f45de454c1'; // Your Client ID
//   const redirectUri = 'https://movin-smart.github.io/smart-on-fhir-tutorial/example-smart-app/launch.html'; // Your Redirect URI
//   useEffect(() => {
//     // Check for authorization code in URL
//     const getAuthCodeFromUrl = () => {
//       const query = new URLSearchParams(window.location.search);
//       const code = query.get('code');
//       if (code) {
//         exchangeCodeForToken(code);
//       } else {
//         redirectToAuthorization();
//       }
//     };
//     // Redirect user to Cerner's authorization endpoint
//     const redirectToAuthorization = () => {
//       const scope = 'patient/Observation.read launch'; // Scopes your application needs
//       const state = 'some-random-state'; // A random string to maintain state
//       const cernerAuthUri = `https://fhir.sandboxcerner.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&state=${state}`;
//       window.location.href = cernerAuthUri; // Redirect to authorization
//     };
//     // Exchange authorization code for access token
//     const exchangeCodeForToken = async (code: string) => {
//       const tokenUrl = 'https://fhir.sandboxcerner.com/oauth2/token';
//       const data = new URLSearchParams();
//       data.append('grant_type', 'authorization_code');
//       data.append('code', code);
//       data.append('redirect_uri', redirectUri);
//       data.append('client_id', clientId);
//       // If required, add client_secret here
//       // data.append('client_secret', 'YOUR_CLIENT_SECRET'); // Uncomment and add your client secret if necessary
//       try {
//         const response = await fetch(tokenUrl, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: data.toString(),
//         });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const tokenData = await response.json();
//         setToken(tokenData.access_token);
//         // Fetch FHIR data now that we have the access token
//         fetchFhirData(tokenData.access_token);
//       } catch (error) {
//         console.error('Error exchanging code for token:', error);
//       }
//     };
//     // Fetch FHIR data with the access token
//     const fetchFhirData = async (accessToken: string) => {
//       const fhirUrl = 'https://code-console.cerner.com/console/details/45b65550-2e87-4e7c-b5f3-2a83c02ed827/e67effc2-ddb1-4630-b65f-18f45de454c1'; // Adjust to the appropriate FHIR endpoint
//       try {
//         const response = await fetch(fhirUrl, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch FHIR data');
//         }
//         const fhirData = await response.json();
//         setFhirData(fhirData);
//       } catch (error) {
//         console.error('Error fetching FHIR data:', error);
//       }
//     };
//     getAuthCodeFromUrl();
//   }, []);
//   return (
//     <div>
//       {fhirData ? (
//         <Dashboard fhirData={fhirData} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };
// export default App;
import { useEffect, useState } from 'react';
import Dashboard from './pages/dashboard';
const App = () => {
    const [token, setToken] = useState(null);
    const [fhirData, setFhirData] = useState(null);
    const clientId = 'e67effc2-ddb1-4630-b65f-18f45de454c1'; // Your Client ID
    const redirectUri = 'https://movin-smart.github.io/smart-on-fhir-tutorial/example-smart-app/launch.html'; // Your Redirect URI
    useEffect(() => {
        const getAuthCodeFromUrl = () => {
            const query = new URLSearchParams(window.location.search);
            const code = query.get('code');
            if (code) {
                exchangeCodeForToken(code);
            }
            else {
                redirectToAuthorization();
            }
        };
        const redirectToAuthorization = () => {
            const scope = 'patient/Observation.read launch'; // Scopes your application needs
            const state = 'some-random-state'; // A random string to maintain state
            const cernerAuthUri = `https://fhir.sandboxcerner.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&state=${state}`;
            window.location.href = cernerAuthUri; // Redirect to authorization
        };
        const exchangeCodeForToken = async (code) => {
            const tokenUrl = 'https://fhir.sandboxcerner.com/oauth2/token';
            const data = new URLSearchParams();
            data.append('grant_type', 'authorization_code');
            data.append('code', code);
            data.append('redirect_uri', redirectUri);
            data.append('client_id', clientId);
            // If required, add client_secret here
            // data.append('client_secret', 'YOUR_CLIENT_SECRET'); // Uncomment and add your client secret if necessary
            try {
                const response = await fetch(tokenUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: data.toString(),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const tokenData = await response.json();
                setToken(tokenData.access_token);
                // Fetch FHIR data now that we have the access token
                fetchFhirData(tokenData.access_token);
            }
            catch (error) {
                console.error('Error exchanging code for token:', error);
            }
        };
        const fetchFhirData = async (accessToken) => {
            const fhirUrl = 'https://code-console.cerner.com/console/details/45b65550-2e87-4e7c-b5f3-2a83c02ed827/e67effc2-ddb1-4630-b65f-18f45de454c1'; // Adjust to the appropriate FHIR endpoint
            try {
                const response = await fetch(fhirUrl, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch FHIR data');
                }
                const fhirData = await response.json();
                setFhirData(fhirData);
            }
            catch (error) {
                console.error('Error fetching FHIR data:', error);
            }
        };
        getAuthCodeFromUrl();
    }, []);
    return (_jsx("div", { children: fhirData ? (_jsx(Dashboard, { fhirData: fhirData })) : (_jsx("p", { children: "Loading..." })) }));
};
export default App;
