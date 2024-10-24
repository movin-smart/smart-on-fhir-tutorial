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
import React, { useEffect, useState } from "react";
import FHIR from 'fhirclient';
import PatientCard from "../components/patientCard";

interface DashboardRecord {
  type: string;
  value: string;
  date: string;
  time: string;
  avgValue: string;
  unit: string;
  test?: string;
  testValue?: string;
  testUnit?: string;
}

interface DashboardPatient {
  profile: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  dob: string;
  id: string;
  presentStatus: string;
  heartAge: number;
  days_remaining: number;
  duration: number;  
  dynamicCount: number;
  records: DashboardRecord[];
}

const Dashboard: React.FC = () => {
  const [fhirClient, setFHIRClient] = useState<any>(null);  // FHIR client object
  const [patients, setPatients] = useState<DashboardPatient[]>([]);  // List of patients
  const [loading, setLoading] = useState(true);  // Loading state

  // Fetch patient data from the FHIR client
  const fetchPatients = async (client: any) => {
    try {
      console.log("Fetching patient data...");

      const pt = await client.patient.read();  // Fetch patient data from FHIR client
      console.log("Patient data:", pt);

      // Create a new patient record based on FHIR data
      const newPatient: DashboardPatient = {
        profile: "../assets/profilepic.jpeg",
        name: pt.name[0].given[0] + " " + pt.name[0].family,
        email: pt.telecom[0].value,
        age: 34,  // Placeholder age, you can calculate this from pt.birthDate if needed
        gender: pt.gender,
        dob: pt.birthDate,
        id: pt.id,
        presentStatus: "Low",  // Example data, modify as per your logic
        heartAge: 55,  // Example data
        days_remaining: 10,  // Example data
        duration: 365,  // Example data
        dynamicCount: 5,  // Example data
        records: [],  // Add real medical records here as per your data
      };

      setPatients([newPatient]);  // Add the new patient to the list
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setLoading(false);  // Set loading to false after fetching
    }
  };

  // Initialize the FHIR client and fetch patients
  useEffect(() => {
    const initializeClient = async () => {
      try {
        // Start the OAuth2 process if the client isn't ready
        FHIR.oauth2.authorize({
          clientId: "my-client-id",  // Replace with your FHIR app's client ID
          scope: "patient/*.read",
          redirectUri: window.location.href,  // Redirect back to the same URL after OAuth2 flow
        });

        const client = await FHIR.oauth2.ready();  // Wait for FHIR client to be ready
        setFHIRClient(client);
        console.log("FHIR Client is ready:", client);
        await fetchPatients(client);  // Fetch patient data after FHIR client is ready
      } catch (error) {
        console.error("FHIR Client is not ready:", error);
        setLoading(false);  // Stop loading if there is an error
      }
    };

    initializeClient();  // Call the initialization function
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Display a loading message while fetching
  }

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <div className="grid grid-cols-1 2xl:grid-cols-1 p-2 lg:p-1">
        {patients.length > 0 ? (
          // Render a PatientCard component for each patient
          patients.map((patient, index) => (
            <PatientCard key={index} patient={patient} gridCount={1} />
          ))
        ) : (
          <div>No patients available</div>  // Display message if no patients are found
        )}
      </div>
    </div>
  );
};

export default Dashboard;
