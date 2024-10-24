// import React, { useMemo, useState } from "react";
// import PatientCard from "../components/patientCard";
// import Loader from "../components/loader";
// import GridToggle from "../components/gridToggle";

// interface DashboardRecord {
//   type: string;
//   value: string;
//   date: string;
//   time: string;
//   omron: string;
//   avgValue: string;
//   unit: string;
//   test?: string;
//   testValue?: string;
//   testUnit?: string;
// }

// interface DashboardPatient {
//   profile: string;
//   name: string;
//   email: string;
//   age: number;
//   gender: string;
//   dob: string;
//   id: string;
//   presentStatus: string;
//   heartAge: number;
//   records: DashboardRecord[];
//   days_remaining: number;
//   duration: number;
//   need_count: number;
//   dynamicCount: number;
//   flag: number;
//   scores: Record<string, any>;
// }

// const staticPatientsData: DashboardPatient[] = [
//   {
//     profile: "../assets/profilepic.jpeg",
//     name: "John Doe",
//     email: "john.doe@example.com",
//     age: 45,
//     gender: "Male",
//     dob: "1979-01-01",
//     id: "123",
//     presentStatus: "Healthy",
//     heartAge: 50,
//     records: [
//       {
//         type: "BP",
//         value: "120/80",
//         date: "2024-10-01",
//         time: "10:30 AM",
//         omron: "Omron",
//         avgValue: "120/80",
//         unit: "mmHg",
//       },
//       {
//         type: "HR",
//         value: "72",
//         date: "2024-10-01",
//         time: "10:35 AM",
//         omron: "Omron",
//         avgValue: "72",
//         unit: "bpm",
//       },
//     ],
//     days_remaining: 30,
//     duration: 120,
//     need_count: 2,
//     dynamicCount: 1,
//     flag: 0,
//     scores: {
//       EF: 60,
//       CO: 5.5,
//       BNP: 100,
//     },
//   },
//   {
//     profile: "../assets/profilepic.jpeg",
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     age: 38,
//     gender: "Female",
//     dob: "1986-05-15",
//     id: "456",
//     presentStatus: "Monitoring",
//     heartAge: 42,
//     records: [
//       {
//         type: "BP",
//         value: "130/85",
//         date: "2024-10-02",
//         time: "11:00 AM",
//         omron: "Omron",
//         avgValue: "130/85",
//         unit: "mmHg",
//       },
//     ],
//     days_remaining: 15,
//     duration: 90,
//     need_count: 1,
//     dynamicCount: 1,
//     flag: 1,
//     scores: {
//       EF: 55,
//       CO: 4.8,
//       BNP: 120,
//     },
//   },
// ];

// const Dashboard: React.FC = () => {
//   const [patients, setPatients] = useState<DashboardPatient[]>(staticPatientsData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading] = useState<boolean>(false);
//   const [error] = useState<string | null>(null);
//   const [gridCount, setGridCount] = useState(1);
//   const patientsPerPage = 10;

//   // Calculate total pages and current patients
//   const totalPages = useMemo(
//     () => Math.ceil(patients.length / patientsPerPage),
//     [patients.length]
//   );
//   const currentPatients = useMemo(() => {
//     const start = (currentPage - 1) * patientsPerPage;
//     return patients.slice(start, start + patientsPerPage);
//   }, [currentPage, patients, patientsPerPage]);

//   // Callback function to handle pagination
//   const paginate = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <>
//         <Loader />
//       </>
//     );
//   }

//   // Render error state
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Render dashboard with patient cards and pagination
//   return (
//     <div className="flex flex-col bg-gray-200 min-h-screen">
//       <GridToggle gridCount={gridCount} setGridCount={setGridCount} />
//       <div
//         className={`grid ${
//           gridCount === 2 ? "grid-cols-2" : "grid-cols-1"
//         } grid-cols-1 p-2 lg:p-1`}
//       >
//         {currentPatients.map((patient, index) => (
//           <PatientCard key={index} patient={patient} gridCount={gridCount} />
//         ))}
//       </div>
//       <div className="flex justify-center my-4">
//         <button
//           className="px-5 text-slate-400"
//           disabled={currentPage === 1}
//           onClick={() => paginate(currentPage - 1)}
//         >
//           {"<"}
//         </button>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => paginate(index + 1)}
//             className={`mr-1 px-3 py-1 rounded-full text-sm text-slate-500 ${
//               currentPage === index + 1 ? "bg-white" : "bg-slate-100"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button
//           className="px-5 text-slate-400"
//           disabled={currentPage === totalPages}
//           onClick={() => paginate(currentPage + 1)}
//         >
//           {">"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;






// import React, { useEffect, useState } from "react";
// import FHIR from 'fhirclient';
// import PatientCard from "../components/patientCard";


// const Dashboard: React.FC = () => {
//   const [fhirClient, setFHIRClient] = useState<Object | null>(null);
//   const [patients, setPatients] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPatients = async (client: any) => {
//     try {
//       console.log("Fetching patient data...");
//       const pt = await client.patient.read();
//       console.log("Patient data:", pt);

//       const newPatient = {
//         profile: "../assets/profilepic.jpeg",
//         name: pt.name[0].given[0] + " " + pt.name[0].family,
//         email: pt.telecom[0].value,
//         age: 34,  // Replace with actual age logic
//         gender: pt.gender,
//         dob: pt.birthDate,
//         id: pt.id,
//         presentStatus: "Low",
//         heartAge: 55,
//         days_remaining: 10,
//         duration: 365,
//         dynamicCount: 5,
//         records: [],
//       };

//       setPatients([newPatient]);
//     } catch (error) {
//       console.error("Error fetching patient data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const initializeClient = async () => {
//       try {
//         // Ensure FHIR Client is ready before accessing it
//         const client = await FHIR.oauth2.ready();
//         setFHIRClient(client);
//         console.log("FHIR Client is ready:", client);
//         await fetchPatients(client);
//       } catch (error) {
//         console.error("FHIR Client is not ready:", error);
//         setLoading(false);
//       }
//     };

//     initializeClient();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col bg-gray-200 min-h-screen">
//       <div className="grid grid-cols-1 2xl:grid-cols-1 p-2 lg:p-1">
//         {patients.length > 0 ? (
//           patients.map((patient, index) => (
//             <PatientCard key={index} patient={patient} gridCount={1} />
//           ))
//         ) : (
//           <div>No patients available</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useEffect, useState } from "react";
// import FHIR from 'fhirclient';
// import PatientCard from "../components/patientCard";

// const Dashboard: React.FC = () => {
//   const [fhirClient, setFHIRClient] = useState<Object | null>(null);
//   const [patients, setPatients] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch patient data after FHIR client is initialized
//   const fetchPatients = async (client: any) => {
//     try {
//       console.log("Fetching patient data...");
//       const pt = await client.patient.read();
//       console.log("Patient data:", pt);

//       const newPatient = {
//         profile: "../assets/profilepic.jpeg",
//         name: pt.name[0].given[0] + " " + pt.name[0].family,
//         email: pt.telecom[0].value,
//         age: 34,  // Replace with actual age logic
//         gender: pt.gender,
//         dob: pt.birthDate,
//         id: pt.id,
//         presentStatus: "Low",
//         heartAge: 55,
//         days_remaining: 10,
//         duration: 365,
//         dynamicCount: 5,
//         records: [],
//       };

//       setPatients([newPatient]);
//     } catch (error) {
//       console.error("Error fetching patient data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize the FHIR client (ensure OAuth2 flow is properly handled)
//   useEffect(() => {
//     const initializeClient = async () => {
//       try {
//         // Check for 'code' and 'state' parameters in the URL
//         const urlParams = new URLSearchParams(window.location.search);
//         const code = urlParams.get('code');
//         const state = urlParams.get('state');

//         if (!code || !state) {
//           console.error("Missing 'code' or 'state' parameter in the URL.");
//           setLoading(false);
//           return;
//         }

//         // If 'code' and 'state' are present, proceed to authorize
//         const client = await FHIR.oauth2.ready();
//         setFHIRClient(client);
//         console.log("FHIR Client is ready:", client);

//         // Fetch patient data once the client is ready
//         await fetchPatients(client);
//       } catch (error) {
//         console.error("FHIR Client is not ready:", error);
//         setLoading(false);
//       }
//     };

//     initializeClient();
//   }, []);

//   // Show a loading spinner or message while fetching data
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col bg-gray-200 min-h-screen">
//       <div className="grid grid-cols-1 2xl:grid-cols-1 p-2 lg:p-1">
//         {patients.length > 0 ? (
//           patients.map((patient, index) => (
//             <PatientCard key={index} patient={patient} gridCount={1} />
//           ))
//         ) : (
//           <div>No patients available</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;









// import React from 'react';

// interface DashboardProps {
//   fhirData: any;
// }

// const Dashboard: React.FC<DashboardProps> = ({ fhirData }) => {
//   return (
//     <div>
//       <h1>Patient Data from Cerner</h1>
//       <pre>{JSON.stringify(fhirData, null, 2)}</pre>
//     </div>
//   );
// };

// export default Dashboard;




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
