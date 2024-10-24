
import React, { useEffect, useState } from "react";
import FHIR from 'fhirclient'; // Default import
import PatientCard from "../components/patientCard";

// Define the props interface
interface DashboardProps {
  fhirData: any; // Define this type more specifically if you know the structure
}

const Dashboard: React.FC<DashboardProps> = ({ fhirData }) => {
  const [fhirClient, setFHIRClient] = useState<any>(null); // Use 'any' or a more specific type if needed
  const [patient, setPatient] = useState<any>(null); // Use 'any' or a more specific type if needed
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeClient = async () => {
      try {
        const client = await FHIR.oauth2.ready();
        setFHIRClient(client);
        console.log("FHIR Client is ready:", client);

        // Fetch patient data
        const patientData = await client.patient.read();
        setPatient(patientData);
        console.log("Patient data:", patientData);
      } catch (error) {
        console.error("Error initializing FHIR client:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeClient();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>No patient data available</div>;
  }

  const name = (patient.name?.[0]?.given?.[0] || '') + " " + (patient.name?.[0]?.family || 'Unknown');
  const email = patient.telecom?.find((t: { system: string; value: string }) => t.system === 'email')?.value ?? "Unknown";

  const patientInfo = {
    profile: "../assets/profilepic.jpeg",
    name,
    email,
    age: calculateAge(patient.birthDate),
    gender: patient.gender ?? "Unknown",
    dob: patient.birthDate ?? "Unknown",
    id: patient.id ?? "Unknown",
    presentStatus: "Low",
    heartAge: 55,
    days_remaining: 10,
    duration: 365,
    dynamicCount: 5,
    records: [],
  };

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <div className="grid grid-cols-1 2xl:grid-cols-1 p-2 lg:p-1">
        <PatientCard patient={patientInfo} gridCount={1} />
      </div>
    </div>
  );
};

// Helper function to calculate age
const calculateAge = (birthDate: string | undefined): number => {
  if (!birthDate) return 0;
  const ageDifMs = Date.now() - new Date(birthDate).getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default Dashboard;