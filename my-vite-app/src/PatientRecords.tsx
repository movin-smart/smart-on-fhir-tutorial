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


import React, { useEffect, useState } from 'react';
import FHIR from 'fhirclient';

const PatientRecords: React.FC = () => {
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    FHIR.oauth2.ready().then((client) => {
      client.request('Patient').then((patient) => {
        setPatient(patient);
      });
    });
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{patient.name[0].text}</h1>
      <p>{patient.birthDate}</p>
      {/* Display other patient details */}
    </div>
  );
};

export default PatientRecords;

