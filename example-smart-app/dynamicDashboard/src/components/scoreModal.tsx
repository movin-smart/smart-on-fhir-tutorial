
import { useEffect, useCallback } from "react";
import "./Modal.css";

interface Score {
  key: string;
  value: string | number;
}

interface ScoreModalProps {
  scores: Score[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScoreModal: React.FC<ScoreModalProps> = ({ scores, isOpen, setOpen }) => {
  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // Close modal on "Escape" key or back button (popstate)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    const handlePopState = () => {
      closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [closeModal]);

  if (!isOpen) {
    return null;
  }

  // Handle click outside the modal
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex justify-center items-center p-2 md:p-20"
      onClick={handleOverlayClick}
    >
      <div
        className="flex justify-center items-center bg-gray-100 p-6 rounded-lg"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="score-container bg-white rounded-lg shadow-lg">
          {scores.map((item: Score) => (
            <div key={item.key} className="score-item">
              <div className="text-gray-200 font-semibold text-sm">{item.key}</div>
              <div className="text-black font-bold text-lg">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreModal;