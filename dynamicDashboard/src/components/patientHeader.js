import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import SmokingBanIcon from "../assets/smoking-ban-icon.svg";
// import SmokingEnabled from "../assets/smoking-ban-red.svg";
// import ProfilePicture from "../assets/profilepic.jpeg";
// import MenuIcon from "../assets/menu-icon.svg";
// import VideoIcon from "../assets/video-icon.svg";
// import PhoneIcon from "../assets/phone-icon.svg";
// import ChatIcon from "../assets/chat-icon.svg";
// import MessageIcon from "../assets/message-icon.svg";
// import ClipIcon from "../assets/clip-icon.svg";
// import FlagIcon from "../assets/flag-icon.svg";
// import { memo, useCallback, useState } from "react";
// import PatientModal from "./patientModal";
// import { Patient } from "../utils/interfaces";
// import ScoreModal from "./scoreModal";
// // Adding the missing properties to PatientHeaderProps
// interface PatientHeaderProps {
//   gridCount?: number;
//   patient: Patient;
//   scores: Array<{ key: string; value: string | number }>; // Adding 'scores' prop
//   isOpen: boolean; // Adding 'isOpen' prop
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>; // Adding 'setOpen' prop
// }
// const PatientInfo: React.FC<{ patient: Patient }> = ({ patient }) => (
//   <div className="flex flex-col justify-center whitespace-nowrap overflow-hidden overflow-ellipsis">
//     <label className="text-base xl:text-xl font-medium">{patient.name}</label>
//     <label className="flex items-center space-x-1 lg:space-x-2 xl:text-sm pt-1 font-medium">
//       {patient.age} | {patient.gender} | {patient.dob}
//     </label>
//     <label className="text-gray-400 text-sm">{patient.id}</label>
//     <label className="text-gray-400 text-sm">{patient.email}</label>
//   </div>
// );
// const LabelledValue: React.FC<{
//   label: string;
//   value: string | number;
// }> = ({ label, value }) => (
//   <div className="flex flex-col space-y-2">
//     <label className="text-gray-500">{label}</label>
//     <p
//       className={`${
//         label === "Heart Age"
//           ? "bg-red-500"
//           : label === "Prevent"
//           ? "bg-green-500"
//           : "bg-blue-500"
//       } text-white rounded-lg px-2 py-1 self-center`}
//     >
//       {value}
//     </p>
//   </div>
// );
// const HighlightedParameters: React.FC<PatientHeaderProps> = ({
//   patient,
//   scores,
//   isOpen,
//   setOpen,
// }) => {
//   return (
//     <div
//       className={`flex flex-col md:flex-row items-center md:space-x-6 lg:space-x-2`}
//     >
//       <div className="flex space-x-2 bg-gray-100 rounded-xl md:rounded-full px-8 py-4">
//         <label className="text-base bg-white rounded-full p-2 font-medium">
//           HTN
//         </label>
//         <img src={SmokingBanIcon} width={25} alt="SmokingDisabled" />
//         <img src={SmokingEnabled} width={25} alt="SmokingEnabled" />
//       </div>
//       <div className="flex space-x-2 xl:space-x-4 bg-gray-100 rounded-xl md:rounded-full px-6 py-2">
//         <LabelledValue label="Heart Age" value={patient.heartAge} />
//         <LabelledValue label="ASCVD" value="8%" />
//         <LabelledValue label="Prevent" value="Low" />
//       </div>
//       <div>
//       <ScoreModal scores={scores} isOpen={isOpen} setOpen={setOpen} />
//       </div>
//     </div>
//   );
// };
// const MenuToggle: React.FC<{
//   patient: Patient;
//   menuToggle: boolean;
//   setMenuToggle: (value: boolean) => void;
// }> = ({ patient, menuToggle, setMenuToggle }) => {
//   const toggleMenu = useCallback(
//     (e: React.MouseEvent) => {
//       e.preventDefault();
//       setMenuToggle(!menuToggle);
//     },
//     [menuToggle, setMenuToggle]
//   );
//   return (
//     <div className="flex items-center justify-center rounded-full relative">
//       <button type="button" className="border md:hidden" onClick={toggleMenu}>
//         <img
//           src={MenuIcon}
//           alt="menu-icon"
//           className="w-8 md:w-14 h-8 md:h-20"
//         />
//       </button>
//       {menuToggle && (
//         <div className="absolute rounded-lg bg-gray-300 p-5 top-0 right-0 transform translate-y-16 -translate-x-1 space-y-4">
//           <HighlightedParameters patient={patient} scores={[]} isOpen={false} setOpen={() => {}} />
//           <ContactIcons mobile />
//         </div>
//       )}
//     </div>
//   );
// };
// const ContactIcons: React.FC<{ mobile?: boolean; gridCount?: number }> = memo(
//   () => {
//     const icons = [
//       { src: VideoIcon, alt: "Video Icon" },
//       { src: PhoneIcon, alt: "Phone Icon" },
//       { src: ChatIcon, alt: "Chat Icon" },
//       { src: MessageIcon, alt: "Message Icon" },
//       { src: ClipIcon, alt: "Clip Icon" },
//       {
//         src: FlagIcon,
//         alt: "Flag Icon",
//         isSpecial: true,
//       },
//     ];
//     return (
//       <div className="flex justify-between md:space-x-2">
//         {icons.map((icon, index) => (
//           <button
//             key={index}
//             className={`${
//               icon.isSpecial ? "bg-blue-600" : "bg-gray-100"
//             } p-1 md:p-3 lg:p-2 xl:p-3 rounded-full`}
//           >
//             <img src={icon.src} alt={icon.alt} />
//           </button>
//         ))}
//       </div>
//     );
//   }
// );
// const PatientHeader: React.FC<PatientHeaderProps> = ({
//   gridCount,
//   patient,
//   scores,
// }) => {
//   const [menuToggle, setMenuToggle] = useState<boolean>(false);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const handlePatientHeaderClick = () => {
//     console.log(patient.id, "patient");
//     setIsModalOpen(true);
//   };
//   return (
//     <>
//       <div
//         className="flex justify-around md:justify-between cursor-pointer"
//         onClick={handlePatientHeaderClick}
//       >
//         <div className={`flex  md:flex-col lg:flex-row space-x-6`}>
//           <div className="flex">
//             <img
//               src={ProfilePicture}
//               className="rounded-full w-12 md:w-20 h-12 md:h-20 self-center"
//               alt="Profile"
//             />
//             <PatientInfo patient={patient} />
//           </div>
//           <div
//             className={`hidden lg:flex ${
//               gridCount === 2 ? "xl:hidden" : "xl:flex"
//             } 2xl:flex`}
//           >
//             <HighlightedParameters
//               patient={patient}
//               scores={scores}
//               isOpen={isModalOpen}
//               setOpen={setIsModalOpen}
//             />
//           </div>
//         </div>
//         <MenuToggle
//           patient={patient}
//           menuToggle={menuToggle}
//           setMenuToggle={setMenuToggle}
//         />
//         <div className={`hidden md:flex items-center`}>
//           <ContactIcons gridCount={gridCount} />
//         </div>
//       </div>
//       <div
//         className={`hidden md:flex lg:hidden ${
//           gridCount === 2 && "xl:flex"
//         } 2xl:hidden m-2 `}
//       >
//         <HighlightedParameters
//           patient={patient}
//           scores={scores}
//           isOpen={isModalOpen}
//           setOpen={setIsModalOpen}
//         />
//       </div>
//       <div
//         id="seperator"
//         className="border-t-2 border-gray-100 mt-0.5 xl:mt-2"
//       ></div>
//       <PatientModal
//         isModalOpen={isModalOpen}
//         setIsModalOpen={setIsModalOpen}
//         patient={patient}
//       />
//     </>
//   );
// };
// export default PatientHeader;
// import SmokingBanIcon from "../assets/smoking-ban-icon.svg";
// import SmokingEnabled from "../assets/smoking-ban-red.svg";
// import ProfilePicture from "../assets/profilepic.jpeg";
// import MenuIcon from "../assets/menu-icon.svg";
// import VideoIcon from "../assets/video-icon.svg";
// import PhoneIcon from "../assets/phone-icon.svg";
// import ChatIcon from "../assets/chat-icon.svg";
// import MessageIcon from "../assets/message-icon.svg";
// import ClipIcon from "../assets/clip-icon.svg";
// import FlagIcon from "../assets/flag-icon.svg";
// import { memo, useCallback, useState } from "react";
// import PatientModal from "./patientModal";
// import "./Modal.css";
// import ScoreModal from "./scoreModal";
// import { Patient, scores } from "../utils/interfaces";
// interface PatientHeaderProps {
//   gridCount?: number;
//   patient: Patient;
// }
// interface HighlightedProps {
//   gridCount?: number;
//   patient: Patient;
//   isOpen: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }
// const PatientInfo: React.FC<{ patient: Patient }> = ({ patient }) => (
//   <div className="flex flex-col justify-center whitespace-nowrap overflow-hidden overflow-ellipsis">
//     <label className="text-base xl:text-xl font-medium">{patient.name}</label>
//     <label className="flex items-center space-x-1 lg:space-x-2 xl:text-sm pt-1 font-medium">
//       {patient.age} | {patient.gender} | {patient.dob}
//     </label>
//     <label className="text-gray-400 text-sm">{patient.id}</label>
//     <label className="text-gray-400 text-sm">{patient.email}</label>
//   </div>
// );
// const LabelledValue: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
//   <div className="flex flex-col space-y-2">
//     <label className="text-gray-500 text-xs">{label}</label>
//     <p
//       className={`${
//         label === "Heart Age"
//           ? "bg-red-500"
//           : label === "Prevent"
//           ? "bg-green-500"
//           : "bg-blue-500"
//       } text-white rounded-lg px-2 py-1 self-center text-xs`}
//     >
//       {value}
//     </p>
//   </div>
// );
// const HighlightedParameters: React.FC<HighlightedProps> = ({ patient, isOpen, setOpen }) => (
//   <>
//   <div className={`flex flex-col md:flex-row items-center md:space-x-6 lg:space-x-2`}>
//     <div className="flex space-x-2 bg-gray-100 rounded-xl md:rounded-full px-8 py-4">
//       <label className="text-base bg-white rounded-full p-2 font-medium">HTN</label>
//       <img src={SmokingBanIcon} width={25} alt="SmokingDisabled" />
//       <img src={SmokingEnabled} width={25} alt="SmokingEnabled" />
//     </div>
//     <div className="flex space-x-2 xl:space-x-4 bg-gray-100 rounded-xl md:rounded-full px-6 py-2">
//       <LabelledValue label="Heart Age" value={patient.heartAge} />
//       <LabelledValue label="ASCVD" value="8%" />
//       <LabelledValue label="Prevent" value="Low" />
//     </div>
//     {/* <div className="flex xl:space-x-8   md:rounded-full px-6 py-4 efee">
//   <Scores isOpen={isOpen} setOpen={setOpen} />
// </div> */}
//   </div>
//   <div className="efee">
//   <Scores isOpen={isOpen} setOpen={setOpen} />
// </div>
// </>
// );
// const MenuToggle: React.FC<{
//   patient: Patient;
//   menuToggle: boolean;
//   setMenuToggle: (value: boolean) => void;
//   isOpen: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }> = ({ patient, menuToggle, setMenuToggle, isOpen, setOpen }) => {
//   const toggleMenu = useCallback(
//     (e: React.MouseEvent) => {
//       e.preventDefault();
//       setMenuToggle(!menuToggle);
//     },
//     [menuToggle, setMenuToggle]
//   );
//   return (
//     <div className="flex items-center justify-center rounded-full relative">
//       <button type="button" className="border md:hidden" onClick={toggleMenu}>
//         <img src={MenuIcon} alt="menu-icon" className="w-8 md:w-14 h-8 md:h-20" />
//       </button>
//       {menuToggle && (
//         <div className="absolute rounded-lg bg-gray-300 p-5 top-0 right-0 transform translate-y-16 -translate-x-1 space-y-4">
//           <HighlightedParameters patient={patient} isOpen={isOpen} setOpen={setOpen} />
//           <ContactIcons mobile />
//         </div>
//       )}
//     </div>
//   );
// };
// const Scores: React.FC<{ isOpen: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }> = memo(({ isOpen, setOpen }) => {
//   const handleScoreClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setOpen(!isOpen);
//   };
//   return (
//     <div className="grid grid-cols-6 score-container" onClick={handleScoreClick} >
//       {scores.slice(0, 6).map((item: { key: string; value: string | number }) => (
//   <div key={item.key} className="text-center score-item">
//     <div className="text-gray-500 font-semibold text-xs">{item.key}</div>
//     <div className="text-black font-bold text-sm">{item.value}</div>
//   </div>
// ))}
//     </div>
//   );
// });
// const ContactIcons: React.FC<{ mobile?: boolean; gridCount?: number }> = memo(() => {
//   const icons = [
//     { src: VideoIcon, alt: "Video Icon" },
//     { src: PhoneIcon, alt: "Phone Icon" },
//     { src: ChatIcon, alt: "Chat Icon" },
//     { src: MessageIcon, alt: "Message Icon" },
//     { src: ClipIcon, alt: "Clip Icon" },
//     { src: FlagIcon, alt: "Flag Icon", isSpecial: true },
//   ];
//   return (
//     <div className="flex justify-between md:space-x-2">
//       {icons.map((icon, index) => (
//         <button key={index} className={`${icon.isSpecial ? "bg-blue-600" : "bg-gray-100"} p-1 md:p-3 lg:p-2 xl:p-3 rounded-full`}>
//           <img src={icon.src} alt={icon.alt} />
//         </button>
//       ))}
//     </div>
//   );
// });
// const PatientHeader: React.FC<PatientHeaderProps> = ({ gridCount, patient }) => {
//   const [menuToggle, setMenuToggle] = useState<boolean>(false);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [isScoreModalOpen, setIsScoreModalOpen] = useState<boolean>(false);
//   const handlePatientHeaderClick = () => {
//     setIsModalOpen(true);
//   };
//   return (
//     <>
//       <div className="flex justify-around md:justify-between cursor-pointer" onClick={handlePatientHeaderClick}>
//         <div className={`flex md:flex-col lg:flex-row space-x-6`}>
//           <div className="flex">
//             <img src={ProfilePicture} className="rounded-full w-12 md:w-20 h-12 md:h-20 self-center" alt="Profile" />
//             <PatientInfo patient={patient} />
//           </div>
//           <div className={`hidden lg:flex ${gridCount === 2 ? "xl:hidden" : "xl:flex"} 2xl:flex`}>
//             <HighlightedParameters patient={patient} isOpen={isScoreModalOpen} setOpen={setIsScoreModalOpen} />
//           </div>
//         </div>
//         <MenuToggle patient={patient} menuToggle={menuToggle} setMenuToggle={setMenuToggle} isOpen={isScoreModalOpen} setOpen={setIsScoreModalOpen} />
//         <div className={`hidden md:flex items-center`}>
//           <ContactIcons gridCount={gridCount} />
//         </div>
//       </div>
//       <div className={`hidden md:flex lg:hidden ${gridCount === 2 && "xl:flex"} 2xl:hidden m-2`}>
//         <HighlightedParameters patient={patient} isOpen={isScoreModalOpen} setOpen={setIsScoreModalOpen} />
//       </div>
//       <div id="seperator" className="border-t-2 border-gray-100 mt-0.5 xl:mt-2"></div>
//       <PatientModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} patient={patient} />
//       <ScoreModal isOpen={isScoreModalOpen} setOpen={setIsScoreModalOpen} scores={scores} />
//     </>
//   );
// };
// export default PatientHeader;
// <--------------Testing -------->
import SmokingBanIcon from "../assets/smoking-ban-icon.svg";
import SmokingEnabled from "../assets/smoking-ban-red.svg";
import ProfilePicture from "../assets/profilepic.jpeg";
import MenuIcon from "../assets/menu-icon.svg";
import VideoIcon from "../assets/video-icon.svg";
import PhoneIcon from "../assets/phone-icon.svg";
import ChatIcon from "../assets/chat-icon.svg";
import MessageIcon from "../assets/message-icon.svg";
import ClipIcon from "../assets/clip-icon.svg";
import FlagIcon from "../assets/flag-icon.svg";
import { memo, useCallback, useState } from "react";
import PatientModal from "./patientModal";
import "./Modal.css";
import ScoreModal from "./scoreModal";
import { scores } from "../utils/interfaces";
const PatientInfo = ({ patient }) => (_jsxs("div", { className: "flex flex-col justify-center whitespace-nowrap overflow-hidden overflow-ellipsis", children: [_jsx("label", { className: "text-base xl:text-xl font-medium", children: patient.name }), _jsxs("label", { className: "flex items-center space-x-1 lg:space-x-2 xl:text-sm pt-1 font-medium", children: [patient.age, " | ", patient.gender, " | ", patient.dob] }), _jsx("label", { className: "text-gray-400 text-sm", children: patient.id }), _jsx("label", { className: "text-gray-400 text-sm", children: patient.email })] }));
const LabelledValue = ({ label, value }) => (_jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx("label", { className: "text-gray-500 text-xs", children: label }), _jsx("p", { className: `${label === "Heart Age"
                ? "bg-red-500"
                : label === "Prevent"
                    ? "bg-green-500"
                    : "bg-blue-500"} text-white rounded-lg px-2 py-1 self-center text-xs`, children: value })] }));
const HighlightedParameters = ({ patient, isOpen, setOpen }) => (_jsxs(_Fragment, { children: [_jsxs("div", { className: `flex flex-col md:flex-row items-center md:space-x-6 lg:space-x-2`, children: [_jsxs("div", { className: "flex space-x-2 bg-gray-100 rounded-xl md:rounded-full px-8 py-4", children: [_jsx("label", { className: "text-base bg-white rounded-full p-2 font-medium", children: "HTN" }), _jsx("img", { src: SmokingBanIcon, width: 25, alt: "SmokingDisabled" }), _jsx("img", { src: SmokingEnabled, width: 25, alt: "SmokingEnabled" })] }), _jsxs("div", { className: "flex space-x-2 xl:space-x-4 bg-gray-100 rounded-xl md:rounded-full px-6 py-2", children: [_jsx(LabelledValue, { label: "Heart Age", value: patient.heartAge }), _jsx(LabelledValue, { label: "ASCVD", value: "8%" }), _jsx(LabelledValue, { label: "Prevent", value: "Low" })] })] }), _jsx("div", { className: "efee", children: _jsx(Scores, { isOpen: isOpen, setOpen: setOpen }) })] }));
const MenuToggle = ({ patient, menuToggle, setMenuToggle, isOpen, setOpen }) => {
    const toggleMenu = useCallback((e) => {
        e.preventDefault();
        setMenuToggle(!menuToggle);
    }, [menuToggle, setMenuToggle]);
    return (_jsxs("div", { className: "flex items-center justify-center rounded-full relative", children: [_jsx("button", { type: "button", className: "border md:hidden", onClick: toggleMenu, children: _jsx("img", { src: MenuIcon, alt: "menu-icon", className: "w-8 md:w-14 h-8 md:h-20" }) }), menuToggle && (_jsxs("div", { className: "absolute rounded-lg bg-gray-300 p-5 top-0 right-0 transform translate-y-16 -translate-x-1 space-y-4", children: [_jsx(HighlightedParameters, { patient: patient, isOpen: isOpen, setOpen: setOpen }), _jsx(ContactIcons, { mobile: true })] }))] }));
};
const Scores = memo(({ isOpen, setOpen }) => {
    const handleScoreClick = (e) => {
        e.stopPropagation();
        setOpen(!isOpen);
    };
    return (_jsx("div", { className: "grid grid-cols-6 score-container", onClick: handleScoreClick, children: scores.slice(0, 6).map((item) => (_jsxs("div", { className: "text-center score-item", children: [_jsx("div", { className: "text-gray-500 font-semibold text-xs", children: item.key }), _jsx("div", { className: "text-black font-bold text-sm", children: item.value })] }, item.key))) }));
});
const ContactIcons = memo(() => {
    const icons = [
        { src: VideoIcon, alt: "Video Icon" },
        { src: PhoneIcon, alt: "Phone Icon" },
        { src: ChatIcon, alt: "Chat Icon" },
        { src: MessageIcon, alt: "Message Icon" },
        { src: ClipIcon, alt: "Clip Icon" },
        { src: FlagIcon, alt: "Flag Icon", isSpecial: true },
    ];
    return (_jsx("div", { className: "flex justify-between md:space-x-2", children: icons.map((icon, index) => (_jsx("button", { className: `${icon.isSpecial ? "bg-blue-600" : "bg-gray-100"} p-1 md:p-3 lg:p-2 xl:p-3 rounded-full`, children: _jsx("img", { src: icon.src, alt: icon.alt }) }, index))) }));
});
const PatientHeader = ({ gridCount, patient }) => {
    const [menuToggle, setMenuToggle] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
    const handlePatientHeaderClick = () => {
        setIsModalOpen(true);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-around md:justify-between cursor-pointer", onClick: handlePatientHeaderClick, children: [_jsxs("div", { className: `flex md:flex-col lg:flex-row space-x-6`, children: [_jsxs("div", { className: "flex", children: [_jsx("img", { src: ProfilePicture, className: "rounded-full w-12 md:w-20 h-12 md:h-20 self-center", alt: "Profile" }), _jsx(PatientInfo, { patient: patient })] }), _jsx("div", { className: `hidden lg:flex ${gridCount === 2 ? "xl:hidden" : "xl:flex"} 2xl:flex`, children: _jsx(HighlightedParameters, { patient: patient, isOpen: isScoreModalOpen, setOpen: setIsScoreModalOpen }) })] }), _jsx(MenuToggle, { patient: patient, menuToggle: menuToggle, setMenuToggle: setMenuToggle, isOpen: isScoreModalOpen, setOpen: setIsScoreModalOpen }), _jsx("div", { className: `hidden md:flex items-center`, children: _jsx(ContactIcons, { gridCount: gridCount }) })] }), _jsx("div", { className: `hidden md:flex lg:hidden ${gridCount === 2 && "xl:flex"} 2xl:hidden m-2`, children: _jsx(HighlightedParameters, { patient: patient, isOpen: isScoreModalOpen, setOpen: setIsScoreModalOpen }) }), _jsx("div", { id: "seperator", className: "border-t-2 border-gray-100 mt-0.5 xl:mt-2" }), _jsx(PatientModal, { isModalOpen: isModalOpen, setIsModalOpen: setIsModalOpen, patient: patient }), _jsx(ScoreModal, { isOpen: isScoreModalOpen, setOpen: setIsScoreModalOpen, scores: scores })] }));
};
export default PatientHeader;
