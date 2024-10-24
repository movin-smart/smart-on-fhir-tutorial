import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './loaderModal.css'; // Make sure this CSS file exists and is linked correctly
const LoaderModal = () => (_jsxs("div", { className: "loader-modal", children: [_jsx("div", { className: "spinner" }), _jsx("div", { className: "loading-text", children: "Loading..." })] }));
export default LoaderModal;
