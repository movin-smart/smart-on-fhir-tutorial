// // import FHIR from '../libs/fhir-client.js'; // Adjust path based on where you copied fhir-client
// import FHIR from './lib/fhir-client.js'; 

// const PatientRecords: React.FC = () => {
//   const [patient, setPatient] = useState<any>(null);

//   useEffect(() => {
//     FHIR.oauth2.ready().then((client) => {
//       client.request('Patient').then((patient) => {
//         setPatient(patient);
//       });
//     });
//   }, []);

//   if (!patient) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{patient.name[0].text}</h1>
//       <p>{patient.birthDate}</p>
//     </div>
//   );
// };

// export default PatientRecords;

import React, { useState, useEffect } from 'react';
import FHIR from 'fhirclient';

const PatientRecords: React.FC = () => {
  const [patient, setPatient] = useState<any>(null);
  const [observations, setObservations] = useState<any[]>([]);

  useEffect(() => {
    // Initialize the FHIR OAuth2 Client
    FHIR.oauth2.ready().then((client) => {
      // Fetch Patient Resource
      client.request('Patient').then((patientData) => {
        setPatient(patientData);
      });

      // Fetch Observation Resource for things like Height, BP, etc.
      client.request('Observation').then((obsData) => {
        setObservations(obsData.entry);
      });
    }).catch(err => {
      console.error("Error during FHIR client auth or data fetching: ", err);
    });
  }, []);

  if (!patient || observations.length === 0) {
    return <div>Loading...</div>;
  }

  // Function to extract specific observations
  const getObservationValue = (code: string) => {
    const observation = observations.find(obs => obs.resource.code.coding[0].code === code);
    return observation ? observation.resource.valueQuantity.value : 'N/A';
  };

  return (
    <div>
      <h2>Patient Resource</h2>
      <table>
        <tbody>
          <tr>
            <th>First Name:</th>
            <td>{patient.name[0]?.given.join(" ")}</td>
          </tr>
          <tr>
            <th>Last Name:</th>
            <td>{patient.name[0]?.family}</td>
          </tr>
          <tr>
            <th>Gender:</th>
            <td>{patient.gender}</td>
          </tr>
          <tr>
            <th>Date of Birth:</th>
            <td>{patient.birthDate}</td>
          </tr>
        </tbody>
      </table>

      <h2>Observation Resource</h2>
      <table>
        <tbody>
          <tr>
            <th>Height:</th>
            <td>{getObservationValue('8302-2')} cm</td> {/* LOINC code for Height */}
          </tr>
          <tr>
            <th>Systolic Blood Pressure:</th>
            <td>{getObservationValue('8480-6')} mmHg</td> {/* LOINC code for Systolic BP */}
          </tr>
          <tr>
            <th>Diastolic Blood Pressure:</th>
            <td>{getObservationValue('8462-4')} mmHg</td> {/* LOINC code for Diastolic BP */}
          </tr>
          <tr>
            <th>HDL:</th>
            <td>{getObservationValue('2085-9')} mg/dL</td> {/* LOINC code for HDL */}
          </tr>
          <tr>
            <th>LDL:</th>
            <td>{getObservationValue('13457-7')} mg/dL</td> {/* LOINC code for LDL */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientRecords;
