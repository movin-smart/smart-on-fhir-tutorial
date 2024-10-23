import React, { memo, useState, MouseEvent, TouchEvent } from "react";
import CreateNoteIcon from "../assets/create-note-icon.svg";
import SignReportIcon from "../assets/sign-report.svg";
import ReviewNotesIcon from "../assets/review-notes-icon.svg";
import PreviewNotesIcon from "../assets/preview-report-icon.svg";
import RecordCard from "./recordCard";
import PatientFooter from "./patientCardFooter";
import PatientHeader from "./patientHeader";
import { Patient } from "../utils/interfaces";
import ResizableAndMovableComponent from "./resizableAndMovable";

interface PatientCardProps {
  gridCount?: number;
  patient: Patient;
}

const ActionButton: React.FC<{
  icon: string;
  label: string;
  filled?: boolean;
  gridCount?: number;
  onClick: () => void; // Accept onClick handler as a prop
}> = ({ icon, label, filled, gridCount, onClick }) => (
  <button
    onClick={onClick}
    className={`flex border-2 border-blue-600 rounded-full 2xl:py-2 py-2 px-2.5 md:p-2 2xl:px-2 space-x-3 items-center justify-center ${
      filled ? "bg-blue-600 text-white" : "text-blue-600"
    }`}
  >
    <img
      src={icon}
      className={`w-5 md:w-12 lg:w-6 ${
        gridCount === 1 ? "xl:w-5" : "xl:w-8"
      } 2xl:w-5`}
      alt={label}
    />
    <label className={`hidden ${gridCount === 1 ? "xl:flex" : "xl:hidden"}`}>
      {label}
    </label>
  </button>
);

const PatientCard: React.FC<PatientCardProps> = ({ gridCount, patient }) => {
  const [isComponentVisible, setComponentVisible] = useState<boolean>(false);

  const handleActionButtonClick = (label: string) => {
    if (label === "Create Note") {
      setComponentVisible(true); // Set visibility to true for "Create Note"
    }
  };

  const handleClose = (e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => {
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

  return (
    <div className="relative bg-white p-2 my-2 mx-2" style={{ borderRadius: "52px" }}>
      {/* Patient Header */}
      <PatientHeader gridCount={gridCount} patient={patient} />

      {/* Record and Action Buttons */}
      <div className="md:flex 2xl:pr-3">
        <RecordCard records={patient.records} />
        <div className="flex md:flex-col justify-around md:justify-end md:space-y-2 md:ml-auto px-3 py-2">
          {actionButtons.map((button, index) => (
            <ActionButton
              key={index}
              icon={button.src}
              label={button.label}
              filled={button.filled}
              gridCount={gridCount}
              onClick={() => handleActionButtonClick(button.label)}
            />
          ))}
        </div>
      </div>

      {/* Patient Footer */}
      <PatientFooter gridCount={gridCount} />

      {/* Conditionally render the ResizableAndMovableComponent inside this patient card */}
      {isComponentVisible && (
        <div className="absolute top-0 left-0 w-full h-full z-50">
          <ResizableAndMovableComponent onClose={handleClose} patient={patient} />
        </div>
      )}
    </div>
  );
};

export default memo(PatientCard);


