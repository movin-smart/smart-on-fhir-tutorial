// import React, { useCallback, useEffect, useMemo, useState } from "react";
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
// }

// const Dashboard: React.FC = () => {
//   const [patients, setPatients] = useState<DashboardPatient[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [gridCount, setGridCount] = useState(1);
//   const patientsPerPage = 10;

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         setLoading(true);
//         const hostname = window.location.hostname;
//         const baseUrl = `http://${hostname}`;
//         const url = `${baseUrl}/OpenEMR/sites/dynamicdashboard.php?report_graph`;
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data from server");
//         }
//         const data = await response.json();
//          console.log("Fetched data:", data);

//         const dynamicPatients = data.map((patientData: any) => {
         
//           const dynamicName = `${patientData.fname} ${patientData.lname}`;
//           const dynamicEmail = patientData.email;
//           const dynamicDOB = patientData.DOB;
//           const dynamicGender = patientData.sex;
//           const dynamicHeartAge = Array.isArray(patientData.heartAge) && patientData.heartAge.length > 0
//             ? patientData.heartAge[0]?.body || 0
//             : 0;
//           const dynamicDaysRemaining = patientData.days_remaining || 0;
//           const dynamicDuration = patientData.duration || 0;
//           const dynamicCount = patientData.need_count || 0;
//           const flag = patientData.flag || 0;

//           const dynamicRecords: DashboardRecord[] = [];
//           // console.log(patientData, "patientData");

//           if (patientData.pb) {
//             dynamicRecords.push({
//               type: "BP",
//               value: patientData.pb[0].pb,
//               date: patientData.pb[0].time.split(" ")[0],
//               time: patientData.pb[0].time.split(" ")[1],
//               omron: patientData.bp_api_type || "Omron",
//               avgValue: patientData.avg_bp || "NA",
//               unit: "mmHg",
//             });
//           }
//           if (patientData.pulse) {
//             dynamicRecords.push({
//               type: "HR",
//               value: patientData.pulse[0].pulse,
//               date: patientData.pulse[0].time.split(" ")[0],
//               time: patientData.pulse[0].time.split(" ")[1],
//               omron: patientData.pulse_api_type,
//               avgValue: patientData.avg_pulse || "NA",
//               unit: "bpm",
//             });
//           }
//           if (patientData.weight) {
//             dynamicRecords.push({
//               type: "Weight",
//               value: patientData.weight[0].weight,
//               date: patientData.weight[0].time.split(" ")[0],
//               time: patientData.weight[0].time.split(" ")[1],
//               omron: patientData.weight_api_type,
//               avgValue: patientData.weight_avg || "NA",
//               unit: "lbs",
//             });
//           }
//           if (patientData.spo2) {
//             dynamicRecords.push({
//               type: "SPO2",
//               value: patientData.spo2[0].spo2,
//               date: patientData.spo2[0].time.split(" ")[0],
//               time: patientData.spo2[0].time.split(" ")[1],
//               omron: patientData.spo2_api_type,
//               avgValue: patientData.avg_spo2 || "NA",
//               unit: "%",
//             });
//           }
//           if (patientData.glucose) {
//             dynamicRecords.push({
//               type: "Glucose",
//               value: patientData.glucose[0].glucose,
//               date: patientData.glucose[0].time.split(" ")[0],
//               time: patientData.glucose[0].time.split(" ")[1],
//               omron: patientData.glucose_api_type,
//               avgValue: patientData.avg_glucose || "NA",
//               unit: "mg/dl",
//             });
//           }
//           if (patientData.ketone) {
//             dynamicRecords.push({
//               type: "Ketone",
//               value: patientData.ketone[0].spo2,
//               date: patientData.ketone[0].time.split(" ")[0],
//               time: patientData.ketone[0].time.split(" ")[1],
//               omron: patientData.ketone_api_type,
//               avgValue: patientData.avg_ketone || "NA",
//               unit: "mmol/L",
//             });
//           }

//           return {
//             profile: "../assets/profilepic.jpeg",
//             name: dynamicName,
//             email: dynamicEmail,
//             age: calculateAge(dynamicDOB),
//             gender: dynamicGender,
//             dob: dynamicDOB,
//             id: patientData.id,
//             presentStatus: "", // You can set this based on your logic
//             heartAge: dynamicHeartAge,
//             records: dynamicRecords,
//             days_remaining: dynamicDaysRemaining,
//             duration: dynamicDuration,
//             dynamicCount: dynamicCount,
//             flag: flag,
//           };
//         });

//         setPatients(dynamicPatients);
//       } catch (error: unknown) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError("An unknown error occurred");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientData();
//   }, []);

//   // Calculate total pages and current patients
//   const totalPages = useMemo(
//     () => Math.ceil(patients.length / patientsPerPage),
//     [patients.length]
//   );
//   const currentPatients = useMemo(() => {
//     const start = (currentPage - 1) * patientsPerPage;
//     return patients.slice(start, start + patientsPerPage);
//   }, [currentPage, patients, patientsPerPage]);

//   // Function to calculate age using DOB from api response(data)
//   const calculateAge = (dob: string): number => {
//     const today = new Date();
//     const birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const month = today.getMonth() - birthDate.getMonth();
//     if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   // Callback function to handle pagination
//   const paginate = useCallback((pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   }, []);

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


// import React, { useCallback, useEffect, useMemo, useState } from "react";
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
// }

// const Dashboard: React.FC = () => {
//   const [patients, setPatients] = useState<DashboardPatient[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [gridCount, setGridCount] = useState(1);
//   const patientsPerPage = 10;

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         setLoading(true);
//         const hostname = window.location.hostname;
//         const baseUrl = `https://${hostname}`;
//         const url = `${baseUrl}/sites/dynamicdashboard.php?report_graph`;
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data from server");
//         }
//         const data = await response.json();
//          console.log("Fetched data:", data);

//         const dynamicPatients = data.map((patientData: any) => {
//           const dynamicName = `${patientData.fname} ${patientData.lname}`;
//           const dynamicEmail = patientData.email;
//           const dynamicDOB = patientData.DOB;
//           const dynamicGender = patientData.sex;
//           const dynamicHeartAge = Array.isArray(patientData.heartAge) && patientData.heartAge.length > 0
//             ? patientData.heartAge[0]?.body || 0
//             : 0;
//           const dynamicDaysRemaining = patientData.days_remaining || 0;
//           const dynamicDuration = patientData.duration || 0;
//           const dynamicCount = patientData.need_count || 0;
//           const flag = patientData.flag || 0;

//           const dynamicRecords: DashboardRecord[] = [];
//           // console.log(patientData, "patientData");

//           if (patientData.pb) {
//             dynamicRecords.push({
//               type: "BP",
//               value: patientData.pb[0].pb,
//               date: patientData.pb[0].time.split(" ")[0],
//               time: patientData.pb[0].time.split(" ")[1],
//               omron: patientData.bp_api_type || "Omron",
//               avgValue: patientData.avg_bp || "NA",
//               unit: "mmHg",
//             });
//           }
//           if (patientData.pulse) {
//             dynamicRecords.push({
//               type: "HR",
//               value: patientData.pulse[0].pulse,
//               date: patientData.pulse[0].time.split(" ")[0],
//               time: patientData.pulse[0].time.split(" ")[1],
//               omron: patientData.pulse_api_type,
//               avgValue: patientData.avg_pulse || "NA",
//               unit: "bpm",
//             });
//           }
//           if (patientData.weight) {
//             dynamicRecords.push({
//               type: "Weight",
//               value: patientData.weight[0].weight,
//               date: patientData.weight[0].time.split(" ")[0],
//               time: patientData.weight[0].time.split(" ")[1],
//               omron: patientData.weight_api_type,
//               avgValue: patientData.weight_avg || "NA",
//               unit: "lbs",
//             });
//           }
//           if (patientData.spo2) {
//             dynamicRecords.push({
//               type: "SPO2",
//               value: patientData.spo2[0].spo2,
//               date: patientData.spo2[0].time.split(" ")[0],
//               time: patientData.spo2[0].time.split(" ")[1],
//               omron: patientData.spo2_api_type,
//               avgValue: patientData.avg_spo2 || "NA",
//               unit: "%",
//             });
//           }
//           if (patientData.glucose) {
//             dynamicRecords.push({
//               type: "Glucose",
//               value: patientData.glucose[0].glucose,
//               date: patientData.glucose[0].time.split(" ")[0],
//               time: patientData.glucose[0].time.split(" ")[1],
//               omron: patientData.glucose_api_type,
//               avgValue: patientData.avg_glucose || "NA",
//               unit: "mg/dl",
//             });
//           }
//           if (patientData.ketone) {
//             dynamicRecords.push({
//               type: "Ketone",
//               value: patientData.ketone[0].spo2,
//               date: patientData.ketone[0].time.split(" ")[0],
//               time: patientData.ketone[0].time.split(" ")[1],
//               omron: patientData.ketone_api_type,
//               avgValue: patientData.avg_ketone || "NA",
//               unit: "mmol/L",
//             });
//           }

//           return {
//             profile: "../assets/profilepic.jpeg",
//             name: dynamicName,
//             email: dynamicEmail,
//             age: calculateAge(dynamicDOB),
//             gender: dynamicGender,
//             dob: dynamicDOB,
//             id: patientData.id,
//             presentStatus: "", // You can set this based on your logic
//             heartAge: dynamicHeartAge,
//             records: dynamicRecords,
//             days_remaining: dynamicDaysRemaining,
//             duration: dynamicDuration,
//             dynamicCount: dynamicCount,
//             flag: flag,
//           };
//         });

//         setPatients(dynamicPatients);
//       } catch (error: unknown) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError("An unknown error occurred");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientData();
//   }, []);

//   // Calculate total pages and current patients
//   const totalPages = useMemo(
//     () => Math.ceil(patients.length / patientsPerPage),
//     [patients.length]
//   );
//   const currentPatients = useMemo(() => {
//     const start = (currentPage - 1) * patientsPerPage;
//     return patients.slice(start, start + patientsPerPage);
//   }, [currentPage, patients, patientsPerPage]);

//   // Function to calculate age using DOB from api response(data)
//   const calculateAge = (dob: string): number => {
//     const today = new Date();
//     const birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const month = today.getMonth() - birthDate.getMonth();
//     if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   // Callback function to handle pagination
//   const paginate = useCallback((pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   }, []);

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



// import React, { useCallback, useEffect, useMemo, useState } from "react";
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
// }

// const Dashboard: React.FC = () => {
//   const [patients, setPatients] = useState<DashboardPatient[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [gridCount, setGridCount] = useState(1);
//   const patientsPerPage = 10;

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         setLoading(true);
//         const hostname = window.location.hostname;
//         const baseUrl = `https://${hostname}`;
//         const url = `${baseUrl}/sites/dynamicdashboard.php?report_graph`;
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data from server");
//         }
//         const data = await response.json();
//          console.log("Fetched data:", data);

//         const dynamicPatients = data.map((patientData: any) => {
//           const dynamicName = `${patientData.fname} ${patientData.lname}`;
//           const dynamicEmail = patientData.email;
//           const dynamicDOB = patientData.DOB;
//           const dynamicGender = patientData.sex;
//           const dynamicHeartAge = Array.isArray(patientData.heartAge) && patientData.heartAge.length > 0
//             ? patientData.heartAge[0]?.body || 0
//             : 0;
//           const dynamicDaysRemaining = patientData.days_remaining || 0;
//           const dynamicDuration = patientData.duration || 0;
//           const dynamicCount = patientData.need_count || 0;
//           const flag = patientData.flag || 0;

//           const dynamicRecords: DashboardRecord[] = [];
//           // console.log(patientData, "patientData");

//           if (patientData.pb) {
//             dynamicRecords.push({
//               type: "BP",
//               value: patientData.pb[0].pb,
//               date: patientData.pb[0].time.split(" ")[0],
//               time: patientData.pb[0].time.split(" ")[1],
//               omron: patientData.bp_api_type || "Omron",
//               avgValue: patientData.avg_bp || "NA",
//               unit: "mmHg",
//             });
//           }
//           if (patientData.pulse) {
//             dynamicRecords.push({
//               type: "HR",
//               value: patientData.pulse[0].pulse,
//               date: patientData.pulse[0].time.split(" ")[0],
//               time: patientData.pulse[0].time.split(" ")[1],
//               omron: patientData.pulse_api_type,
//               avgValue: patientData.avg_pulse || "NA",
//               unit: "bpm",
//             });
//           }
//           if (patientData.weight) {
//             dynamicRecords.push({
//               type: "Weight",
//               value: patientData.weight[0].weight,
//               date: patientData.weight[0].time.split(" ")[0],
//               time: patientData.weight[0].time.split(" ")[1],
//               omron: patientData.weight_api_type,
//               avgValue: patientData.weight_avg || "NA",
//               unit: "lbs",
//             });
//           }
//           if (patientData.spo2) {
//             dynamicRecords.push({
//               type: "SPO2",
//               value: patientData.spo2[0].spo2,
//               date: patientData.spo2[0].time.split(" ")[0],
//               time: patientData.spo2[0].time.split(" ")[1],
//               omron: patientData.spo2_api_type,
//               avgValue: patientData.avg_spo2 || "NA",
//               unit: "%",
//             });
//           }
//           if (patientData.glucose) {
//             dynamicRecords.push({
//               type: "Glucose",
//               value: patientData.glucose[0].glucose,
//               date: patientData.glucose[0].time.split(" ")[0],
//               time: patientData.glucose[0].time.split(" ")[1],
//               omron: patientData.glucose_api_type,
//               avgValue: patientData.avg_glucose || "NA",
//               unit: "mg/dl",
//             });
//           }
//           if (patientData.ketone) {
//             dynamicRecords.push({
//               type: "Ketone",
//               value: patientData.ketone[0].spo2,
//               date: patientData.ketone[0].time.split(" ")[0],
//               time: patientData.ketone[0].time.split(" ")[1],
//               omron: patientData.ketone_api_type,
//               avgValue: patientData.avg_ketone || "NA",
//               unit: "mmol/L",
//             });
//           }

//           return {
//             profile: "../assets/profilepic.jpeg",
//             name: dynamicName,
//             email: dynamicEmail,
//             age: calculateAge(dynamicDOB),
//             gender: dynamicGender,
//             dob: dynamicDOB,
//             id: patientData.id,
//             presentStatus: "", // You can set this based on your logic
//             heartAge: dynamicHeartAge,
//             records: dynamicRecords,
//             days_remaining: dynamicDaysRemaining,
//             duration: dynamicDuration,
//             dynamicCount: dynamicCount,
//             flag: flag,
//           };
//         });

//         setPatients(dynamicPatients);
//       } catch (error: unknown) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError("An unknown error occurred");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientData();
//   }, []);

//   // Calculate total pages and current patients
//   const totalPages = useMemo(
//     () => Math.ceil(patients.length / patientsPerPage),
//     [patients.length]
//   );
//   const currentPatients = useMemo(() => {
//     const start = (currentPage - 1) * patientsPerPage;
//     return patients.slice(start, start + patientsPerPage);
//   }, [currentPage, patients, patientsPerPage]);

//   // Function to calculate age using DOB from api response(data)
//   const calculateAge = (dob: string): number => {
//     const today = new Date();
//     const birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const month = today.getMonth() - birthDate.getMonth();
//     if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   // Callback function to handle pagination
//   const paginate = useCallback((pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   }, []);

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




// *********************Testing *********************




// import React, { useCallback, useEffect, useMemo, useState } from "react";
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

// const Dashboard: React.FC = () => {
//   const [patients, setPatients] = useState<DashboardPatient[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [gridCount, setGridCount] = useState(1);
//   const patientsPerPage = 10;

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         setLoading(true);
//         const hostname = window.location.hostname;
//         const baseUrl = `https://${hostname}`;
//         const url = `${baseUrl}/OpenEMR/sites/dynamicdashboard.php?report_graph`;     
//            const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data from server");
//         }
//         const data = await response.json();
//          console.log("Fetched data:", data);

//         const dynamicPatients = data.map((patientData: any) => {
//           const dynamicName = `${patientData.fname} ${patientData.lname}`;
//           const dynamicEmail = patientData.email;
//           const dynamicDOB = patientData.DOB;
//           const dynamicGender = patientData.sex;
//           const dynamicHeartAge = Array.isArray(patientData.heartAge) && patientData.heartAge.length > 0
//             ? patientData.heartAge[0]?.body || 0
//             : 0;
//           const dynamicDaysRemaining = patientData.days_remaining || 0;
//           const dynamicDuration = patientData.duration || 0;
//           const dynamicCount = patientData.need_count || 0;
//           const flag = patientData.flag || 0;

//           const dynamicRecords: DashboardRecord[] = [];
//           // console.log(patientData, "patientData");

//           if (patientData.pb) {
//             dynamicRecords.push({
//               type: "BP",
//               value: patientData.pb[0].pb,
//               date: patientData.pb[0].time.split(" ")[0],
//               time: patientData.pb[0].time.split(" ")[1],
//               omron: patientData.bp_api_type || "Omron",
//               avgValue: patientData.avg_bp || "NA",
//               unit: "mmHg",
//             });
//           }
//           if (patientData.pulse) {
//             dynamicRecords.push({
//               type: "HR",
//               value: patientData.pulse[0].pulse,
//               date: patientData.pulse[0].time.split(" ")[0],
//               time: patientData.pulse[0].time.split(" ")[1],
//               omron: patientData.pulse_api_type,
//               avgValue: patientData.avg_pulse || "NA",
//               unit: "bpm",
//             });
//           }
//           if (patientData.weight) {
//             dynamicRecords.push({
//               type: "Weight",
//               value: patientData.weight[0].weight,
//               date: patientData.weight[0].time.split(" ")[0],
//               time: patientData.weight[0].time.split(" ")[1],
//               omron: patientData.weight_api_type,
//               avgValue: patientData.weight_avg || "NA",
//               unit: "lbs",
//             });
//           }
//           if (patientData.spo2) {
//             dynamicRecords.push({
//               type: "SPO2",
//               value: patientData.spo2[0].spo2,
//               date: patientData.spo2[0].time.split(" ")[0],
//               time: patientData.spo2[0].time.split(" ")[1],
//               omron: patientData.spo2_api_type,
//               avgValue: patientData.avg_spo2 || "NA",
//               unit: "%",
//             });
//           }
//           if (patientData.glucose) {
//             dynamicRecords.push({
//               type: "Glucose",
//               value: patientData.glucose[0].glucose,
//               date: patientData.glucose[0].time.split(" ")[0],
//               time: patientData.glucose[0].time.split(" ")[1],
//               omron: patientData.glucose_api_type,
//               avgValue: patientData.avg_glucose || "NA",
//               unit: "mg/dl",
//             });
//           }
//           if (patientData.ketone) {
//             dynamicRecords.push({
//               type: "Ketone",
//               value: patientData.ketone[0].spo2,
//               date: patientData.ketone[0].time.split(" ")[0],
//               time: patientData.ketone[0].time.split(" ")[1],
//               omron: patientData.ketone_api_type,
//               avgValue: patientData.avg_ketone || "NA",
//               unit: "mmol/L",
//             });
//           }

//           const patientScores = patientData.scores;
//           const scoresData = patientScores === "Score not found"
//             ? { message: "Score has no data" }
//             : { ...patientScores };


//           return {
//             profile: "../assets/profilepic.jpeg",
//             name: dynamicName,
//             email: dynamicEmail,
//             age: calculateAge(dynamicDOB),
//             gender: dynamicGender,
//             dob: dynamicDOB,
//             id: patientData.id,
//             presentStatus: "", // You can set this based on your logic
//             heartAge: dynamicHeartAge,
//             records: dynamicRecords,
//             days_remaining: dynamicDaysRemaining,
//             duration: dynamicDuration,
//             dynamicCount: dynamicCount,
//             flag: flag,
//             scores: scoresData, 
//           };
//         });

//         setPatients(dynamicPatients);
//       } catch (error: unknown) {
//         if (error instanceof Error) {
//           setError(error.message);
//         } else {
//           setError("An unknown error occurred");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatientData();
//   }, []);

//   // Calculate total pages and current patients
//   const totalPages = useMemo(
//     () => Math.ceil(patients.length / patientsPerPage),
//     [patients.length]
//   );
//   const currentPatients = useMemo(() => {
//     const start = (currentPage - 1) * patientsPerPage;
//     return patients.slice(start, start + patientsPerPage);
//   }, [currentPage, patients, patientsPerPage]);

//   // Function to calculate age using DOB from api response(data)
//   const calculateAge = (dob: string): number => {
//     const today = new Date();
//     const birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const month = today.getMonth() - birthDate.getMonth();
//     if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   // Callback function to handle pagination
//   const paginate = useCallback((pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   }, []);

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


import React, { useMemo, useState } from "react";
import PatientCard from "../components/patientCard";
import Loader from "../components/loader";
import GridToggle from "../components/gridToggle";

interface DashboardRecord {
  type: string;
  value: string;
  date: string;
  time: string;
  omron: string;
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
  records: DashboardRecord[];
  days_remaining: number;
  duration: number;
  need_count: number;
  dynamicCount: number;
  flag: number;
  scores: Record<string, any>;
}

const staticPatientsData: DashboardPatient[] = [
  {
    profile: "../assets/profilepic.jpeg",
    name: "John Doe",
    email: "john.doe@example.com",
    age: 45,
    gender: "Male",
    dob: "1979-01-01",
    id: "123",
    presentStatus: "Healthy",
    heartAge: 50,
    records: [
      {
        type: "BP",
        value: "120/80",
        date: "2024-10-01",
        time: "10:30 AM",
        omron: "Omron",
        avgValue: "120/80",
        unit: "mmHg",
      },
      {
        type: "HR",
        value: "72",
        date: "2024-10-01",
        time: "10:35 AM",
        omron: "Omron",
        avgValue: "72",
        unit: "bpm",
      },
    ],
    days_remaining: 30,
    duration: 120,
    need_count: 2,
    dynamicCount: 1,
    flag: 0,
    scores: {
      EF: 60,
      CO: 5.5,
      BNP: 100,
    },
  },
  {
    profile: "../assets/profilepic.jpeg",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 38,
    gender: "Female",
    dob: "1986-05-15",
    id: "456",
    presentStatus: "Monitoring",
    heartAge: 42,
    records: [
      {
        type: "BP",
        value: "130/85",
        date: "2024-10-02",
        time: "11:00 AM",
        omron: "Omron",
        avgValue: "130/85",
        unit: "mmHg",
      },
    ],
    days_remaining: 15,
    duration: 90,
    need_count: 1,
    dynamicCount: 1,
    flag: 1,
    scores: {
      EF: 55,
      CO: 4.8,
      BNP: 120,
    },
  },
];

const Dashboard: React.FC = () => {
  const [patients, setPatients] = useState<DashboardPatient[]>(staticPatientsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  const [gridCount, setGridCount] = useState(1);
  const patientsPerPage = 10;

  // Calculate total pages and current patients
  const totalPages = useMemo(
    () => Math.ceil(patients.length / patientsPerPage),
    [patients.length]
  );
  const currentPatients = useMemo(() => {
    const start = (currentPage - 1) * patientsPerPage;
    return patients.slice(start, start + patientsPerPage);
  }, [currentPage, patients, patientsPerPage]);

  // Callback function to handle pagination
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Render loading state
  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render dashboard with patient cards and pagination
  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <GridToggle gridCount={gridCount} setGridCount={setGridCount} />
      <div
        className={`grid ${
          gridCount === 2 ? "grid-cols-2" : "grid-cols-1"
        } grid-cols-1 p-2 lg:p-1`}
      >
        {currentPatients.map((patient, index) => (
          <PatientCard key={index} patient={patient} gridCount={gridCount} />
        ))}
      </div>
      <div className="flex justify-center my-4">
        <button
          className="px-5 text-slate-400"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mr-1 px-3 py-1 rounded-full text-sm text-slate-500 ${
              currentPage === index + 1 ? "bg-white" : "bg-slate-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-5 text-slate-400"
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from 'react';

// const Dashboard: React.FC = () => {
//   const [patientData, setPatientData] = useState<any>(null);

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const token = 'your_access_token';  // Replace with the actual token

//         const response = await fetch(
//           'https://fhir.sandboxcerner.com/dstu2/Patient',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: 'application/json',
//             },
//           }
//         );

//         const data = await response.json();
//         setPatientData(data);
//       } catch (error) {
//         console.error('Error fetching patient data:', error);
//       }
//     };

//     fetchPatientData();
//   }, []);

//   return (
//     <div>
//       <h1>Patient Data</h1>
//       {patientData ? (
//         <pre>{JSON.stringify(patientData, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;





