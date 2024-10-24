import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import PatientFooter from "./patientCardFooter";
// import {
//   dateOptions,
//   generateLabelsForDateRange,
//   useDateRange,
//   vitalOptions,
// } from "../utils";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import TableIcon from "../assets/tabular-icon.svg";
// import GraphIcon from "../assets/graph-icon.svg";
// import FilterIcon from "../assets/filter-icon.svg";
// import MenuDropIcon from "../assets/arrow-down-sign.svg";
// import TableData from "./tabularData";
// import GraphData from "./graphicalData";
// import { Patient } from "../utils/interfaces";
// import PatientHeader from "./patientHeader";
// interface PatientModalProps {
//   isModalOpen: boolean;
//   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   patient: Patient;
// }
// const CustomDropdown: React.FC<{
//   options: { value: string; label: string; icon: string }[];
//   selectedValue: string;
//   onChange: (value: string) => void;
// }> = ({ options, selectedValue, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   console.log(selectedValue,"asdfghjk");
//   const handleOptionClick = (value: string) => {
//     onChange(value);
//     setIsOpen(false);
//   };
//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-blue-700 text-white p-3 rounded-full flex items-center space-x-4"
//         aria-label="Toggle dropdown"
//       >
//         <img
//           src={options.find((option) => option.value === selectedValue)?.icon}
//           alt="Icon"
//           className="w-6 h-6"
//         />
//         <label>
//           {options.find((option) => option.value === selectedValue)?.label}
//         </label>
//         <img src={MenuDropIcon} width={10} alt="Dropdown arrow" />
//       </button>
//       {isOpen && (
//         <ul className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
//           {options.map((option) => (
//             <li
//               key={option.value}
//               className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
//               onClick={() => handleOptionClick(option.value)}
//               aria-label={option.label}
//             >
//               <img
//                 src={option.icon}
//                 alt={`${option.label} icon`}
//                 className="w-6 h-6 mr-2"
//               />
//               {option.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
// const DateOptionCheckbox: React.FC<{
//   option: string;
//   selectedOption: string | null;
//   handleChange: (option: string) => void;
//   selectedStartDate: Date | null;
//   setSelectedStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
//   selectedEndDate: Date | null;
//   setSelectedEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
// }> = ({
//   option,
//   selectedOption,
//   handleChange,
//   selectedStartDate,
//   setSelectedStartDate,
//   setSelectedEndDate,
//   selectedEndDate,
// }) => (
//     <label className="flex items-center text-sm bg-gray-50 rounded-3xl p-2">
//       <input
//         type="checkbox"
//         checked={selectedOption === option}
//         onChange={() => handleChange(option)}
//         className="mr-2"
//         aria-label={`Select ${option}`}
//       />
//       {option === "From" ? (
//         <div id="from-to" className="flex space-x-2">
//           <label className="text-gray-600 font-medium">From</label>
//           <DatePicker
//             selected={selectedStartDate}
//             onChange={(date: Date | null) => setSelectedStartDate(date)}
//             dateFormat="MM/dd/yyyy"
//             className="text-gray-600 font-medium w-20 bg-gray-50"
//             placeholderText="Select date"
//           />
//           <label className="text-gray-600 font-medium">To</label>
//           <DatePicker
//             selected={selectedEndDate}
//             onChange={(date: Date | null) => setSelectedEndDate(date)}
//             dateFormat="MM/dd/yyyy"
//             className="text-gray-600 font-medium w-20 bg-gray-50"
//             placeholderText="Select date"
//           />
//         </div>
//       ) : (
//         option
//       )}
//     </label>
//   );
// const ToggleButton: React.FC<{
//   selected: boolean;
//   label: string;
//   icon: string;
//   onClick: () => void;
// }> = ({ selected, label, icon, onClick }) => (
//   <button
//     className={`flex space-x-2 items-center p-3 rounded-full ${selected ? "bg-blue-700 text-white" : "bg-gray-50"
//       }`}
//     onClick={onClick}
//     aria-label={label}
//   >
//     <img src={icon} width={30} alt={`${label} icon`} />
//     <label>{label}</label>
//   </button>
// );
// const FilterButton: React.FC<{
//   showFilterOptions: boolean;
//   setShowFilterOptions: React.Dispatch<React.SetStateAction<boolean>>;
// }> = ({ showFilterOptions, setShowFilterOptions }) => (
//   <button
//     className="bg-gray-50 p-3 flex items-center rounded-full"
//     aria-label="Filter"
//     onClick={() => setShowFilterOptions(!showFilterOptions)}
//   >
//     <img src={FilterIcon} width={20} alt="Filter icon" />
//     <label>Filter</label>
//   </button>
// );
// const FilterAccordion: React.FC<{
//   showFilterOptions: boolean;
//   setShowFilterOptions: React.Dispatch<React.SetStateAction<boolean>>;
//   selectedVital: string | null;
//   handleVitalChange: (option: string) => void;
//   applyFilter: () => void;
// }> = ({
//   showFilterOptions,
//   selectedVital,
//   handleVitalChange,
//   applyFilter,
// }) => {
//     if (!showFilterOptions) return null;
//     return (
//       <div className="bg-gray-100 p-3 rounded-2xl">
//         <ul className="grid grid-cols-2 space-y-2">
//           {vitalOptions.map((vital) => (
//             <li key={vital} className="flex items-center">
//               <input
//                 type="checkbox"
//                 id={vital}
//                 checked={selectedVital === vital}
//                 onChange={() => handleVitalChange(vital)}
//                 className="form-checkbox h-4 w-4 text-blue-600"
//               />
//               <label htmlFor={vital} className="ml-2 text-sm text-gray-700">
//                 {vital}
//               </label>
//             </li>
//           ))}
//         </ul>
//         <div className="mt-6">
//           <button
//             className="w-full bg-blue-600 text-white py-2 rounded-full"
//             onClick={applyFilter}
//           >
//             Apply Filter
//           </button>
//         </div>
//       </div>
//     );
//   };
// const PatientModal: React.FC<PatientModalProps> = ({
//   isModalOpen,
//   setIsModalOpen,
//   patient,
// }) => {
//   const [selectedOption, setSelectedOption] = useState<string>("30 days");
//   const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
//   const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
//   const [selectedToggle, setSelectedToggle] = useState<"Table" | "Graph">("Graph");
//   const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);
//   const [selectedVital, setSelectedVital] = useState<string | null>("All");
//   const [fetchedData, setFetchedData] = useState<{
//     bloodPressureDiastolic: (string | number)[];
//     bloodPressureSystolic: (string | number)[];
//     glucose: (string | number)[];
//     heartRate: (string | number)[];
//     spo2: (string | number)[];
//     weight: (string | number)[];
//   } | null>(null);
//   const { startDate, endDate, numberOfPoints } = useDateRange(
//     selectedOption,
//     selectedStartDate,
//     selectedEndDate
//   );
//   const [pendingSelectedVital, setPendingSelectedVital] = useState<string | null>("All");
//   const handlePendingVitalChange = (option: string) => {
//     setPendingSelectedVital((prevOption) =>
//       prevOption === option ? null : option
//     );
//   };
//   const applyFilter = () => {
//     setSelectedVital(pendingSelectedVital);
//     setShowFilterOptions(false);
//   };
//   const handleDateCheckboxChange = useCallback((option: string) => {
//     setSelectedOption((prevOption) =>
//       prevOption === option ? "30 days" : option
//     );
//   }, []);
//   const handleVitalChange = (option: string) => {
//     setSelectedVital((prevOption) => (prevOption === option ? null : option));
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const hostname = window.location.hostname;
//         const baseUrl = `https://${hostname}`;
//         const url = new URL(`${baseUrl}/sites/dynamicgraph.php`);
//         // Append query parameters only if they are not null
//         if (selectedOption !== null) {
//           url.searchParams.append('selectedOption', selectedOption);
//         }
//         if (selectedVital !== null) {
//           url.searchParams.append('selectedVital', selectedVital);
//         }
//         if (selectedStartDate !== null) {
//           url.searchParams.append('selectedStartDate', selectedStartDate.toString());
//         }
//         if (selectedEndDate !== null) {
//           url.searchParams.append('selectedEndDate', selectedEndDate.toString());
//         }
//         url.searchParams.append('pid', patient.id);
//         const response = await fetch(url.toString());
//         if (!response.ok) {
//           throw new Error("Failed to fetch data from server");
//         }
//         const data = await response.json();
//         // Process the fetched data
//         setFetchedData({
//           bloodPressureDiastolic: data.blood_pressure_diastolic,
//           bloodPressureSystolic: data.blood_pressure_systolic,
//           glucose: data.glucose,
//           heartRate: data.heart_rate,
//           spo2: data.spo2,
//           weight: data.weight
//         });
//       } catch (error) {
//         if (error instanceof Error) {
//           console.log(error.message);
//         } else {
//           console.log("An unknown error occurred");
//         }
//       }
//     };
//     fetchData();
//   }, [selectedOption, selectedVital, selectedStartDate, selectedEndDate, patient.id]);
//   const dateRangeLabels = generateLabelsForDateRange(startDate, endDate);
//   const filteredData = useMemo(() => {
//     if (!fetchedData) return [];
//     const bloodPressureParameter = [
//       {
//         vital: "Systolic Blood Pressure",
//         readings: fetchedData.bloodPressureSystolic.map((val, index) => ({
//           label: dateRangeLabels[index],
//           value: val as number
//         })),
//       },
//       {
//         vital: "Diastolic Blood Pressure",
//         readings: fetchedData.bloodPressureDiastolic.map((val, index) => ({
//           label: dateRangeLabels[index],
//           value: val as number
//         })),
//       },
//     ]
//     const vitalData = [
//       ...bloodPressureParameter,
//       {
//         vital: "Heart Rate",
//         readings: fetchedData.heartRate.map((val, index) => ({
//           label: dateRangeLabels[index],
//           value: val as number
//         })),
//       },
//       {
//         vital: "Weight",
//         readings: fetchedData.weight.map((val, index) => ({
//           label: dateRangeLabels[index],
//           value: val as number
//         })),
//       },
//       {
//         vital: "Glucose",
//         readings: fetchedData.glucose.map((val, index) => ({
//           label: dateRangeLabels[index],
//           value: val as number
//         })),
//       },
//       {
//         vital: "SPO2",
//         readings: fetchedData.spo2.map((val, index) => ({
//           label: dateRangeLabels[index],
//           value: val as number
//         })),
//       },
//     ];
//     return selectedVital === "All"
//       ? vitalData.map((item) => ({
//         vital: item.vital,
//         readings: item.readings.map(r => r.value) // Transform to array of numbers
//       }))
//       : selectedVital === "Blood Pressure" ?
//         bloodPressureParameter
//           .map((item) => ({
//             vital: item.vital,
//             readings: item.readings.map(r => r.value) // Transform to array of numbers
//           }))
//         : vitalData
//           .filter((item) => item.vital === selectedVital)
//           .map((item) => ({
//             vital: item.vital,
//             readings: item.readings.map(r => r.value) // Transform to array of numbers
//           }));
//   }, [fetchedData, numberOfPoints, selectedVital, dateRangeLabels]);
//   if (!isModalOpen) {
//     return null;
//   }
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex justify-center items-center p-2 md:p-20"
//       onClick={() => setIsModalOpen(false)}
//       aria-hidden="true"
//     >
//       <div
//         className="bg-white w-full p-6 rounded-2xl shadow-lg m-6 "
//         onClick={(e: React.MouseEvent) => e.stopPropagation()}
//         role="dialog"
//         aria-modal="true"
//       >
//         <div className="relative">
//           <PatientHeader gridCount={1} patient={patient} />
//         </div>
//         <>
//           {/* Desktop */}
//           <div id="days-toggle" className="hidden lg:flex justify-between p-4">
//             <div id="days-filter" className="flex space-x-4">
//               {dateOptions.map((option) => (
//                 <DateOptionCheckbox
//                   key={option}
//                   option={option}
//                   selectedOption={selectedOption}
//                   handleChange={handleDateCheckboxChange}
//                   selectedStartDate={selectedStartDate}
//                   selectedEndDate={selectedEndDate}
//                   setSelectedStartDate={setSelectedStartDate}
//                   setSelectedEndDate={setSelectedEndDate}
//                 />
//               ))}
//             </div>
//             <div
//               id="toggle-representation"
//               className="hidden lg:flex space-x-4"
//             >
//               <ToggleButton
//                 selected={selectedToggle === "Table"}
//                 label="Table"
//                 icon={TableIcon}
//                 onClick={() => setSelectedToggle("Table")}
//               />
//               <ToggleButton
//                 selected={selectedToggle === "Graph"}
//                 label="Graphic"
//                 icon={GraphIcon}
//                 onClick={() => setSelectedToggle("Graph")}
//               />
//             </div>
//           </div>
//           <div className="lg:hidden flex justify-between space-x-2 m-2">
//             <FilterButton
//               showFilterOptions={showFilterOptions}
//               setShowFilterOptions={setShowFilterOptions}
//             />
//             <CustomDropdown
//               options={[
//                 { value: "Table", label: "Table", icon: TableIcon },
//                 { value: "Graph", label: "Graphic", icon: GraphIcon },
//               ]}
//               selectedValue={selectedToggle}
//               onChange={(value) =>
//                 setSelectedToggle(value as "Table" | "Graph")
//               }
//             />
//           </div>
//           <FilterAccordion
//             showFilterOptions={showFilterOptions}
//             setShowFilterOptions={setShowFilterOptions}
//             selectedVital={pendingSelectedVital}
//             handleVitalChange={handlePendingVitalChange}
//             applyFilter={applyFilter}
//           />
//           {/* Color Code representation */}
//           <div id="parameter-review" className="flex justify-between px-4">
//             <div id="parameter-filter" className="hidden lg:flex space-x-4">
//               {vitalOptions.map((vital) => (
//                 <label
//                   key={vital}
//                   className="flex items-center text-sm bg-gray-50 rounded-3xl p-2"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedVital === vital}
//                     onChange={() => handleVitalChange(vital)}
//                     className="mr-2"
//                   />
//                   {vital}
//                 </label>
//               ))}
//             </div>
//             <div
//               id="review-sign"
//               className="flex w-full lg:w-auto mt-4 lg:mt-0"
//             >
//               <button className="w-full lg:w-auto border-2 border-blue-700 text-blue-700 px-8 py-3 rounded-full">
//                 Review and Sign
//               </button>
//             </div>
//           </div>
//           <div id="visual-representation" className="flex">
//             {selectedToggle === "Table" ? (
//               <TableData
//                 data={filteredData}
//                 dateRangeLabels={dateRangeLabels}
//                 maxColumns={numberOfPoints}
//               />
//             ) : (
//               <GraphData
//                 data={filteredData}
//                 dateRangeLabels={dateRangeLabels}
//               />
//             )}
//           </div>
//         </>
//         <PatientFooter gridCount={1} />
//       </div>
//     </div>
//   );
// };
// export default PatientModal;
import { useState, useCallback, useMemo, useEffect } from "react";
import PatientFooter from "./patientCardFooter";
import { dateOptions, generateLabelsForDateRange, useDateRange, vitalOptions, } from "../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableIcon from "../assets/tabular-icon.svg";
import GraphIcon from "../assets/graph-icon.svg";
import FilterIcon from "../assets/filter-icon.svg";
import MenuDropIcon from "../assets/arrow-down-sign.svg";
import TableData from "./tabularData";
import GraphData from "./graphicalData";
import PatientHeader from "./patientHeader";
const CustomDropdown = ({ options, selectedValue, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    console.log(selectedValue, "asdfghjk");
    const handleOptionClick = (value) => {
        onChange(value);
        setIsOpen(false);
    };
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "bg-blue-700 text-white p-3 rounded-full flex items-center space-x-4", "aria-label": "Toggle dropdown", children: [_jsx("img", { src: options.find((option) => option.value === selectedValue)?.icon, alt: "Icon", className: "w-6 h-6" }), _jsx("label", { children: options.find((option) => option.value === selectedValue)?.label }), _jsx("img", { src: MenuDropIcon, width: 10, alt: "Dropdown arrow" })] }), isOpen && (_jsx("ul", { className: "absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg", children: options.map((option) => (_jsxs("li", { className: "flex items-center p-2 cursor-pointer hover:bg-gray-100", onClick: () => handleOptionClick(option.value), "aria-label": option.label, children: [_jsx("img", { src: option.icon, alt: `${option.label} icon`, className: "w-6 h-6 mr-2" }), option.label] }, option.value))) }))] }));
};
const DateOptionCheckbox = ({ option, selectedOption, handleChange, selectedStartDate, setSelectedStartDate, setSelectedEndDate, selectedEndDate, }) => (_jsxs("label", { className: "flex items-center text-sm bg-gray-50 rounded-3xl p-2", children: [_jsx("input", { type: "checkbox", checked: selectedOption === option, onChange: () => handleChange(option), className: "mr-2", "aria-label": `Select ${option}` }), option === "From" ? (_jsxs("div", { id: "from-to", className: "flex space-x-2", children: [_jsx("label", { className: "text-gray-600 font-medium", children: "From" }), _jsx(DatePicker, { selected: selectedStartDate, onChange: (date) => setSelectedStartDate(date), dateFormat: "MM/dd/yyyy", className: "text-gray-600 font-medium w-20 bg-gray-50", placeholderText: "Select date" }), _jsx("label", { className: "text-gray-600 font-medium", children: "To" }), _jsx(DatePicker, { selected: selectedEndDate, onChange: (date) => setSelectedEndDate(date), dateFormat: "MM/dd/yyyy", className: "text-gray-600 font-medium w-20 bg-gray-50", placeholderText: "Select date" })] })) : (option)] }));
const ToggleButton = ({ selected, label, icon, onClick }) => (_jsxs("button", { className: `flex space-x-2 items-center p-3 rounded-full ${selected ? "bg-blue-700 text-white" : "bg-gray-50"}`, onClick: onClick, "aria-label": label, children: [_jsx("img", { src: icon, width: 30, alt: `${label} icon` }), _jsx("label", { children: label })] }));
const FilterButton = ({ showFilterOptions, setShowFilterOptions }) => (_jsxs("button", { className: "bg-gray-50 p-3 flex items-center rounded-full", "aria-label": "Filter", onClick: () => setShowFilterOptions(!showFilterOptions), children: [_jsx("img", { src: FilterIcon, width: 20, alt: "Filter icon" }), _jsx("label", { children: "Filter" })] }));
const FilterAccordion = ({ showFilterOptions, selectedVital, handleVitalChange, applyFilter, }) => {
    if (!showFilterOptions)
        return null;
    return (_jsxs("div", { className: "bg-gray-100 p-3 rounded-2xl", children: [_jsx("ul", { className: "grid grid-cols-2 space-y-2", children: vitalOptions.map((vital) => (_jsxs("li", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", id: vital, checked: selectedVital === vital, onChange: () => handleVitalChange(vital), className: "form-checkbox h-4 w-4 text-blue-600" }), _jsx("label", { htmlFor: vital, className: "ml-2 text-sm text-gray-700", children: vital })] }, vital))) }), _jsx("div", { className: "mt-6", children: _jsx("button", { className: "w-full bg-blue-600 text-white py-2 rounded-full", onClick: applyFilter, children: "Apply Filter" }) })] }));
};
const PatientModal = ({ isModalOpen, setIsModalOpen, patient, }) => {
    const [selectedOption, setSelectedOption] = useState("30 days");
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [selectedToggle, setSelectedToggle] = useState("Graph");
    const [showFilterOptions, setShowFilterOptions] = useState(false);
    const [selectedVital, setSelectedVital] = useState("All");
    const [fetchedData, setFetchedData] = useState(null);
    const { startDate, endDate, numberOfPoints } = useDateRange(selectedOption, selectedStartDate, selectedEndDate);
    const [pendingSelectedVital, setPendingSelectedVital] = useState("All");
    const handlePendingVitalChange = (option) => {
        setPendingSelectedVital((prevOption) => prevOption === option ? null : option);
    };
    const applyFilter = () => {
        setSelectedVital(pendingSelectedVital);
        setShowFilterOptions(false);
    };
    const handleDateCheckboxChange = useCallback((option) => {
        setSelectedOption((prevOption) => prevOption === option ? "30 days" : option);
    }, []);
    const handleVitalChange = (option) => {
        setSelectedVital((prevOption) => (prevOption === option ? null : option));
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const hostname = window.location.hostname;
                const baseUrl = `https://${hostname}`;
                const url = new URL(`${baseUrl}/sites/dynamicgraph.php`);
                // Append query parameters only if they are not null
                if (selectedOption !== null) {
                    url.searchParams.append('selectedOption', selectedOption);
                }
                if (selectedVital !== null) {
                    url.searchParams.append('selectedVital', selectedVital);
                }
                if (selectedStartDate !== null) {
                    url.searchParams.append('selectedStartDate', selectedStartDate.toString());
                }
                if (selectedEndDate !== null) {
                    url.searchParams.append('selectedEndDate', selectedEndDate.toString());
                }
                url.searchParams.append('pid', patient.id);
                const response = await fetch(url.toString());
                if (!response.ok) {
                    throw new Error("Failed to fetch data from server");
                }
                const data = await response.json();
                // Process the fetched data
                setFetchedData({
                    bloodPressureDiastolic: data.blood_pressure_diastolic,
                    bloodPressureSystolic: data.blood_pressure_systolic,
                    glucose: data.glucose,
                    heartRate: data.heart_rate,
                    spo2: data.spo2,
                    weight: data.weight
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                else {
                    console.log("An unknown error occurred");
                }
            }
        };
        fetchData();
    }, [selectedOption, selectedVital, selectedStartDate, selectedEndDate, patient.id]);
    const dateRangeLabels = generateLabelsForDateRange(startDate, endDate);
    const filteredData = useMemo(() => {
        if (!fetchedData)
            return [];
        const bloodPressureParameter = [
            {
                vital: "Systolic Blood Pressure",
                readings: fetchedData.bloodPressureSystolic.map((val, index) => ({
                    label: dateRangeLabels[index],
                    value: val
                })),
            },
            {
                vital: "Diastolic Blood Pressure",
                readings: fetchedData.bloodPressureDiastolic.map((val, index) => ({
                    label: dateRangeLabels[index],
                    value: val
                })),
            },
        ];
        const vitalData = [
            ...bloodPressureParameter,
            {
                vital: "Heart Rate",
                readings: fetchedData.heartRate.map((val, index) => ({
                    label: dateRangeLabels[index],
                    value: val
                })),
            },
            {
                vital: "Weight",
                readings: fetchedData.weight.map((val, index) => ({
                    label: dateRangeLabels[index],
                    value: val
                })),
            },
            {
                vital: "Glucose",
                readings: fetchedData.glucose.map((val, index) => ({
                    label: dateRangeLabels[index],
                    value: val
                })),
            },
            {
                vital: "SPO2",
                readings: fetchedData.spo2.map((val, index) => ({
                    label: dateRangeLabels[index],
                    value: val
                })),
            },
        ];
        return selectedVital === "All"
            ? vitalData.map((item) => ({
                vital: item.vital,
                readings: item.readings.map(r => r.value) // Transform to array of numbers
            }))
            : selectedVital === "Blood Pressure" ?
                bloodPressureParameter
                    .map((item) => ({
                    vital: item.vital,
                    readings: item.readings.map(r => r.value) // Transform to array of numbers
                }))
                : vitalData
                    .filter((item) => item.vital === selectedVital)
                    .map((item) => ({
                    vital: item.vital,
                    readings: item.readings.map(r => r.value) // Transform to array of numbers
                }));
    }, [fetchedData, numberOfPoints, selectedVital, dateRangeLabels]);
    if (!isModalOpen) {
        return null;
    }
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex justify-center items-center p-2 md:p-20", onClick: () => setIsModalOpen(false), "aria-hidden": "true", children: _jsxs("div", { className: "bg-white w-full p-6 rounded-2xl shadow-lg m-6 ", onClick: (e) => e.stopPropagation(), role: "dialog", "aria-modal": "true", children: [_jsx("div", { className: "relative", children: _jsx(PatientHeader, { gridCount: 1, patient: patient }) }), _jsxs(_Fragment, { children: [_jsxs("div", { id: "days-toggle", className: "hidden lg:flex justify-between p-4", children: [_jsx("div", { id: "days-filter", className: "flex space-x-4", children: dateOptions.map((option) => (_jsx(DateOptionCheckbox, { option: option, selectedOption: selectedOption, handleChange: handleDateCheckboxChange, selectedStartDate: selectedStartDate, selectedEndDate: selectedEndDate, setSelectedStartDate: setSelectedStartDate, setSelectedEndDate: setSelectedEndDate }, option))) }), _jsxs("div", { id: "toggle-representation", className: "hidden lg:flex space-x-4", children: [_jsx(ToggleButton, { selected: selectedToggle === "Table", label: "Table", icon: TableIcon, onClick: () => setSelectedToggle("Table") }), _jsx(ToggleButton, { selected: selectedToggle === "Graph", label: "Graphic", icon: GraphIcon, onClick: () => setSelectedToggle("Graph") })] })] }), _jsxs("div", { className: "lg:hidden flex justify-between space-x-2 m-2", children: [_jsx(FilterButton, { showFilterOptions: showFilterOptions, setShowFilterOptions: setShowFilterOptions }), _jsx(CustomDropdown, { options: [
                                        { value: "Table", label: "Table", icon: TableIcon },
                                        { value: "Graph", label: "Graphic", icon: GraphIcon },
                                    ], selectedValue: selectedToggle, onChange: (value) => setSelectedToggle(value) })] }), _jsx(FilterAccordion, { showFilterOptions: showFilterOptions, setShowFilterOptions: setShowFilterOptions, selectedVital: pendingSelectedVital, handleVitalChange: handlePendingVitalChange, applyFilter: applyFilter }), _jsxs("div", { id: "parameter-review", className: "flex justify-between px-4", children: [_jsx("div", { id: "parameter-filter", className: "hidden lg:flex space-x-4", children: vitalOptions.map((vital) => (_jsxs("label", { className: "flex items-center text-sm bg-gray-50 rounded-3xl p-2", children: [_jsx("input", { type: "checkbox", checked: selectedVital === vital, onChange: () => handleVitalChange(vital), className: "mr-2" }), vital] }, vital))) }), _jsx("div", { id: "review-sign", className: "flex w-full lg:w-auto mt-4 lg:mt-0", children: _jsx("button", { className: "w-full lg:w-auto border-2 border-blue-700 text-blue-700 px-8 py-3 rounded-full", children: "Review and Sign" }) })] }), _jsx("div", { id: "visual-representation", className: "flex", children: selectedToggle === "Table" ? (_jsx(TableData, { data: filteredData, dateRangeLabels: dateRangeLabels, maxColumns: numberOfPoints })) : (_jsx(GraphData, { data: filteredData, dateRangeLabels: dateRangeLabels })) })] }), _jsx(PatientFooter, { gridCount: 1 })] }) }));
};
export default PatientModal;
