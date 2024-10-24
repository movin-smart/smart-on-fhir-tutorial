import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useCallback } from "react";
import "./Modal.css";
const ScoreModal = ({ scores, isOpen, setOpen }) => {
    const closeModal = useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    // Close modal on "Escape" key or back button (popstate)
    useEffect(() => {
        const handleKeyDown = (event) => {
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
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex justify-center items-center p-2 md:p-20", onClick: handleOverlayClick, children: _jsx("div", { className: "flex justify-center items-center bg-gray-100 p-6 rounded-lg", role: "dialog", "aria-modal": "true", onClick: (e) => e.stopPropagation(), children: _jsx("div", { className: "score-container bg-white rounded-lg shadow-lg", children: scores.map((item) => (_jsxs("div", { className: "score-item", children: [_jsx("div", { className: "text-gray-200 font-semibold text-sm", children: item.key }), _jsx("div", { className: "text-black font-bold text-lg", children: item.value })] }, item.key))) }) }) }));
};
export default ScoreModal;
