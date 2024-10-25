import React, { useState, useEffect } from 'react';
import FHIR from 'fhirclient';

const FHIRPatientRecords = () => {
  const [patient, setPatient] = useState(null);
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeFHIRClient = async () => {
      try {
        const client = await FHIR.oauth2.ready();
        const patientData = await client.request('Patient');
        setPatient(patientData);

        const observationData = await client.request('Observation');
        setObservations(observationData.entry || []);

        setLoading(false);
      } catch (err) {
        console.error("Error during FHIR client auth or data fetching: ", err);
        setError("Failed to load patient data. Please try again.");
        setLoading(false);
      }
    };

    initializeFHIRClient();
  }, []);

  const getObservationValue = (code) => {
    const observation = observations.find(obs => obs.resource.code.coding[0].code === code);
    return observation ? `${observation.resource.valueQuantity.value} ${observation.resource.valueQuantity.unit}` : 'N/A';
  };

  if (loading) return <div>Loading patient data...</div>;
  if (error) return <div>{error}</div>;
  if (!patient) return <div>No patient data available.</div>;

  return (
    <div className="patient-records">
      <h2>Patient Resource</h2>
      <table>
        <tbody>
          <tr>
            <th>First Name:</th>
            <td>{patient.name?.[0]?.given?.join(" ") || 'N/A'}</td>
          </tr>
          <tr>
            <th>Last Name:</th>
            <td>{patient.name?.[0]?.family || 'N/A'}</td>
          </tr>
          <tr>
            <th>Gender:</th>
            <td>{patient.gender || 'N/A'}</td>
          </tr>
          <tr>
            <th>Date of Birth:</th>
            <td>{patient.birthDate || 'N/A'}</td>
          </tr>
        </tbody>
      </table>

      <h2>Observation Resource</h2>
      <table>
        <tbody>
          <tr>
            <th>Height:</th>
            <td>{getObservationValue('8302-2')}</td>
          </tr>
          <tr>
            <th>Systolic Blood Pressure:</th>
            <td>{getObservationValue('8480-6')}</td>
          </tr>
          <tr>
            <th>Diastolic Blood Pressure:</th>
            <td>{getObservationValue('8462-4')}</td>
          </tr>
          <tr>
            <th>HDL:</th>
            <td>{getObservationValue('2085-9')}</td>
          </tr>
          <tr>
            <th>LDL:</th>
            <td>{getObservationValue('13457-7')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FHIRPatientRecords;
