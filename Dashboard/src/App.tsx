
import React, { useEffect, useState } from 'react';
import FHIR from 'fhirclient';

const App = () => {
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    FHIR.oauth2.ready().then((client: any) => {
      client.request(`Patient/${client.patient.id}`).then((pt: any) => {
        setPatient(pt);
      });
    }).catch(console.error);
  }, []);

  return (
    <div>
      <h1>FHIR Patient Data</h1>
      {patient ? (
        <div>
          <p>First Name: {patient.name[0].given[0]}</p>
          <p>Last Name: {patient.name[0].family}</p>
          <p>Gender: {patient.gender}</p>
          <p>Date of Birth: {patient.birthDate}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;

// import './App.css'

// function App() {

//   return (
//     <>
//      <div>
//      <h1 className="text-3xl  font-bold underline">
//       Hello world!
//     </h1>
//      </div>
//     </>
//   )
// }

// export default App
