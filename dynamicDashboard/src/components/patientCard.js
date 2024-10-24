import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useState } from "react";
import CreateNoteIcon from "../assets/create-note-icon.svg";
import SignReportIcon from "../assets/sign-report.svg";
import ReviewNotesIcon from "../assets/review-notes-icon.svg";
import PreviewNotesIcon from "../assets/preview-report-icon.svg";
import RecordCard from "./recordCard";
import PatientFooter from "./patientCardFooter";
import PatientHeader from "./patientHeader";
import ResizableAndMovableComponent from "./resizableAndMovable";
const ActionButton = ({ icon, label, filled, gridCount, onClick }) => (_jsxs("button", { onClick: onClick, className: `flex border-2 border-blue-600 rounded-full 2xl:py-2 py-2 px-2.5 md:p-2 2xl:px-2 space-x-3 items-center justify-center ${filled ? "bg-blue-600 text-white" : "text-blue-600"}`, children: [_jsx("img", { src: icon, className: `w-5 md:w-12 lg:w-6 ${gridCount === 1 ? "xl:w-5" : "xl:w-8"} 2xl:w-5`, alt: label }), _jsx("label", { className: `hidden ${gridCount === 1 ? "xl:flex" : "xl:hidden"}`, children: label })] }));
const PatientCard = ({ gridCount, patient }) => {
    const [isComponentVisible, setComponentVisible] = useState(false);
    const handleActionButtonClick = (label) => {
        if (label === "Create Note") {
            setComponentVisible(true); // Set visibility to true for "Create Note"
        }
    };
    const handleClose = (e) => {
        if (e.type === "click" || e.type === "touchend") {
            setComponentVisible(false);
        }
    };
    const actionButtons = [
        { src: CreateNoteIcon, label: "Create Note", filled: true },
        { src: PreviewNotesIcon, label: "Preview Note" },
        { src: ReviewNotesIcon, label: "Preview Report", filled: true },
        { src: SignReportIcon, label: "Sign Report" },
    ];
    return (_jsxs("div", { className: "relative bg-white p-2 my-2 mx-2", style: { borderRadius: "52px" }, children: [_jsx(PatientHeader, { gridCount: gridCount, patient: patient }), _jsxs("div", { className: "md:flex 2xl:pr-3", children: [_jsx(RecordCard, { records: patient.records }), _jsx("div", { className: "flex md:flex-col justify-around md:justify-end md:space-y-2 md:ml-auto px-3 py-2", children: actionButtons.map((button, index) => (_jsx(ActionButton, { icon: button.src, label: button.label, filled: button.filled, gridCount: gridCount, onClick: () => handleActionButtonClick(button.label) }, index))) })] }), _jsx(PatientFooter, { gridCount: gridCount }), isComponentVisible && (_jsx("div", { className: "absolute top-0 left-0 w-full h-full z-50", children: _jsx(ResizableAndMovableComponent, { onClose: handleClose, patient: patient }) }))] }));
};
export default memo(PatientCard);
