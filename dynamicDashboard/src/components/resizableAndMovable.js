import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import React, { useState, useEffect } from 'react';
// import { Rnd, RndDragCallback, RndResizeCallback } from 'react-rnd';
// import CloseButton from '../assets/close-button.svg';
// import MicrophoneIcon from '../assets/microphone-icon.svg'; // Add the microphone icon
// import ProfilePicture from '../assets/profilepic.jpeg';
// import { sections, SectionKey } from '../utils/sections';
// import { Patient } from '../utils/interfaces';
// import Modal from './Modal';
// import './ResizableAndMovableComponent.css';
// interface ResizableAndMovableComponentProps {
//   onClose: (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => void;
//   patient: Patient;
// }
// const ResizableAndMovableComponent: React.FC<ResizableAndMovableComponentProps> = ({ onClose, patient }) => {
//   const [rnd, setRnd] = useState<{ width: number; height: number; x: number; y: number }>({
//     width: 700,
//     height: 610,
//     x: window.innerWidth / 2 - 350,
//     y: window.innerHeight / 2 - 305,
//   });
//   const [selectedSections, setSelectedSections] = useState<Record<SectionKey, boolean>>({
//     'H&P': true,
//     SOAP: false,
//     Procedure: false,
//     Counseling: false,
//     'Discharge Summary': false,
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [apiResponse, setApiResponse] = useState<any>(null); // Store API response
//   const [currentSection, setCurrentSection] = useState<SectionKey | null>(null); // Track the current section for the modal
//   useEffect(() => {
//     // Center the component on window resize
//     const handleResize = () => {
//       setRnd((prevRnd) => ({
//         ...prevRnd,
//         x: window.innerWidth / 2 - prevRnd.width / 2,
//         y: window.innerHeight / 2 - prevRnd.height / 2,
//       }));
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
//   const setPosition: RndDragCallback = (e, data) => {
//     setRnd((prevRnd) => ({ ...prevRnd, x: data.x, y: data.y }));
//   };
//   const setSize: RndResizeCallback = (e, direction, ref, delta, position) => {
//     setRnd((prevRnd) => ({
//       ...prevRnd,
//       width: parseInt(ref.style.width, 10),
//       height: parseInt(ref.style.height, 10),
//       ...position,
//     }));
//   };
//   const handleCheckboxChange = (section: SectionKey) => {
//     // Enable only the microphone for the selected section
//     setSelectedSections({
//       'H&P': section === 'H&P',
//       SOAP: section === 'SOAP',
//       Procedure: section === 'Procedure',
//       Counseling: section === 'Counseling',
//       'Discharge Summary': section === 'Discharge Summary',
//     });
//   };
//   const handleMicClick = (sectionKey: SectionKey) => {
//     setCurrentSection(sectionKey); // Track the current section
//     setIsModalOpen(true); // Open the modal when the microphone is clicked
//   };
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };
//   // Handle API response after form submission
//   const handleModalSubmit = (response: any) => {
//     if (response && response.api_response && response.api_response.body) {
//       setApiResponse(response.api_response.body.report); // Store the report data in apiResponse
//     }
//     setIsModalOpen(false); // Close the modal
//   };
//   const selectedSectionKeys = Object.keys(selectedSections).filter((key) =>
//     selectedSections[key as SectionKey]
//   );
//   return (
//     <>
//       <Rnd 
//         minWidth={320}
//         position={{ x: rnd.x, y: rnd.y }}
//         onDragStop={setPosition}
//         onResizeStop={setSize}
//         className="z-50 p-2 shadow-2xl rounded-2xl bg-gray-100"
//       >
//         <div className="relative">
//           <button
//             onClick={onClose}
//             onTouchEnd={onClose}
//             className="absolute top-2 right-2 z-50 p-2 rounded-full bg-white shadow-md hover:bg-gray-200"
//           >
//             <img src={CloseButton} width={30} alt="close-btn" />  
//           </button>
//           <div id="patient-info-container" className="bg-gray-50 rounded-3xl flex items-center mb-4 p-2">
//             <img src={ProfilePicture} className="rounded-full w-12 h-12 mr-3" alt="Profile" />
//             <div>
//               <h2 className="text-lg font-bold">{patient.name}</h2>
//               <p className="text-sm text-gray-500">{patient.dob}</p>
//               <p className="text-sm text-gray-500">{patient.id}</p>
//             </div>
//           </div>
//           <div className="overflow-y-auto max-h-100 custom-scrollbar">
//             <div id="section-container" className="flex flex-wrap mb-4">
//               {Object.keys(sections).map((key) => {
//                 const sectionKey = key as SectionKey;
//                 return (
//                   <div key={sectionKey} className="flex items-center bg-white rounded-full px-3 py-1 m-2">
//                     <input
//                       type="checkbox"
//                       id={sectionKey}
//                       checked={selectedSections[sectionKey]}
//                       onChange={() => handleCheckboxChange(sectionKey)}
//                       className="mr-2"
//                     />
//                     <label htmlFor={sectionKey} className="text-base font-medium">
//                       {sectionKey}
//                     </label>
//                     {/* Add Microphone Icon */}
//                     {selectedSections[sectionKey] && (
//     <button onClick={() => handleMicClick(sectionKey)} className="ml-2">
//       <img src={MicrophoneIcon} width={20} alt="microphone-icon" />
//     </button>
//   )}
//                   </div>
//                 );
//               })}
//             </div>
//             {/* Display API response dynamically based on selected section */}
//             <div className="bg-white rounded-3xl overflow-y-auto max-h-60 custom-scrollbar p-2">
//               {apiResponse ? (
//                 selectedSectionKeys.map((sectionKey) => (
//                   <div key={sectionKey} className="pt-3 px-3">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-semibold mb-2">{sections[sectionKey as SectionKey].name}</h3>
//                     </div>
//                     <div className="list-disc list-inside">
//                       {/* Display the dynamic response from API */}
//                       {sections[sectionKey as SectionKey].sections.map((sectionDetail) => (
//                         <p key={sectionDetail}>
//                           <strong>{sectionDetail}:</strong> {apiResponse[sectionDetail] || 'Not provided'}
//                         </p>
//                       ))}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p>No data yet. Select a section and submit the form.</p>
//               )}
//             </div>
//                        <div className="bg-white rounded-3xl mt-5 p-6 overflow-y-auto max-h-64 custom-scrollbar"
//                style={{ marginTop: '10px' }}
//              >
//                <p className="text-xs">
//                  For this patient, the following ICD-10 codes are appropriate
//                  These are autogenerated. Please accept only those you decide as
//                  appropriate codes.
//                </p>
//                <div className="flex justify-between bg-gray-50 rounded-3xl py-2 px-4 mt-2">
//                  <p className="text-lg font-semibold">Diagnosis Lists</p>
//                </div>
//              </div>
//             {/* Modal Component for submission */}
//             <Modal
//               isOpen={isModalOpen}
//               onClose={handleCloseModal}
//               patientId={patient.id}
//               selectedSections={selectedSectionKeys}
//               onSubmit={handleModalSubmit} // Pass the response handler
//             />
//           </div>
//         </div>
//       </Rnd>
//     </>
//   );
// };
// export default ResizableAndMovableComponent;
import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import CloseButton from '../assets/close-button.svg';
import MicrophoneIcon from '../assets/microphone-icon.svg';
import ProfilePicture from '../assets/profilepic.jpeg';
import { sections } from '../utils/sections';
import Modal from './Modal';
import './ResizableAndMovableComponent.css';
const ResizableAndMovableComponent = ({ onClose, patient }) => {
    const [rnd, setRnd] = useState({
        width: 700,
        height: 610,
        x: window.innerWidth / 2 - 350,
        y: window.innerHeight / 2 - 305,
    });
    const [selectedSections, setSelectedSections] = useState({
        'H&P': true,
        SOAP: false,
        Procedure: false,
        Counseling: false,
        'Discharge Summary': false,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [currentSection, setCurrentSection] = useState(null);
    useEffect(() => {
        const handleResize = () => {
            setRnd((prevRnd) => ({
                ...prevRnd,
                x: window.innerWidth / 2 - prevRnd.width / 2,
                y: window.innerHeight / 2 - prevRnd.height / 2,
            }));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const setPosition = (e, data) => {
        setRnd((prevRnd) => ({ ...prevRnd, x: data.x, y: data.y }));
    };
    const setSize = (e, direction, ref, delta, position) => {
        setRnd((prevRnd) => ({
            ...prevRnd,
            width: parseInt(ref.style.width, 10),
            height: parseInt(ref.style.height, 10),
            ...position,
        }));
    };
    const handleCheckboxChange = (section) => {
        setSelectedSections({
            'H&P': section === 'H&P',
            SOAP: section === 'SOAP',
            Procedure: section === 'Procedure',
            Counseling: section === 'Counseling',
            'Discharge Summary': section === 'Discharge Summary',
        });
    };
    const handleMicClick = (sectionKey) => {
        setCurrentSection(sectionKey);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleModalSubmit = (response) => {
        if (response && response.api_response && response.api_response.body) {
            setApiResponse(response.api_response.body.report);
        }
        setIsModalOpen(false);
    };
    const selectedSectionKeys = Object.keys(selectedSections).filter((key) => selectedSections[key]);
    return (_jsx(_Fragment, { children: _jsx(Rnd, { minWidth: 320, position: { x: rnd.x, y: rnd.y }, onDragStop: setPosition, onResizeStop: setSize, className: "z-50 p-2 shadow-2xl rounded-2xl bg-gray-100", children: _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: onClose, onTouchEnd: onClose, className: "absolute top-2 right-2 z-50 p-2 rounded-full bg-white shadow-md hover:bg-gray-200", children: _jsx("img", { src: CloseButton, width: 30, alt: "close-btn" }) }), _jsxs("div", { id: "patient-info-container", className: "bg-gray-50 rounded-3xl flex items-center mb-4 p-2", children: [_jsx("img", { src: ProfilePicture, className: "rounded-full w-12 h-12 mr-3", alt: "Profile" }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-bold", children: patient.name }), _jsx("p", { className: "text-sm text-gray-500", children: patient.dob }), _jsx("p", { className: "text-sm text-gray-500", children: patient.id })] })] }), _jsxs("div", { className: "overflow-y-auto max-h-100 custom-scrollbar", children: [_jsx("div", { id: "section-container", className: "flex flex-wrap mb-4", children: Object.keys(sections).map((key) => {
                                    const sectionKey = key;
                                    return (_jsxs("div", { className: "flex items-center bg-white rounded-full px-3 py-1 m-2", children: [_jsx("input", { type: "checkbox", id: sectionKey, checked: selectedSections[sectionKey], onChange: () => handleCheckboxChange(sectionKey), className: "mr-2" }), _jsx("label", { htmlFor: sectionKey, className: "text-base font-medium", children: sectionKey }), selectedSections[sectionKey] && (_jsx("button", { onClick: () => handleMicClick(sectionKey), className: "ml-2", children: _jsx("img", { src: MicrophoneIcon, width: 20, alt: "microphone-icon" }) }))] }, sectionKey));
                                }) }), _jsx("div", { className: "bg-white rounded-3xl overflow-y-auto max-h-60 custom-scrollbar p-2", children: apiResponse ? (selectedSectionKeys.map((sectionKey) => (_jsxs("div", { className: "pt-3 px-3", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsx("h3", { className: "text-lg font-semibold mb-2", children: sections[sectionKey].name }) }), _jsx("div", { className: "list-disc list-inside", children: sections[sectionKey].sections.map((sectionDetail) => (_jsxs("p", { children: [_jsxs("strong", { children: [sectionDetail, ":"] }), " ", apiResponse[sectionDetail] || 'Not provided'] }, sectionDetail))) })] }, sectionKey)))) : (_jsx("p", { children: "No data yet. Select a section and submit the form." })) }), _jsxs("div", { className: "bg-white rounded-3xl mt-5 p-6 overflow-y-auto max-h-64 custom-scrollbar", style: { marginTop: '10px' }, children: [_jsx("p", { className: "text-xs", children: "For this patient, the following ICD-10 codes are appropriate. These are autogenerated. Please accept only those you decide as appropriate codes." }), _jsx("div", { className: "flex justify-between bg-gray-50 rounded-3xl py-2 px-4 mt-2", children: _jsx("p", { className: "text-lg font-semibold", children: "Diagnosis Lists" }) })] }), _jsx(Modal, { isOpen: isModalOpen, onClose: handleCloseModal, patientId: patient.id, selectedSections: selectedSectionKeys, onSubmit: handleModalSubmit })] })] }) }) }));
};
export default ResizableAndMovableComponent;
