import { jsx as _jsx } from "react/jsx-runtime";
const Loader = () => {
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-200", children: _jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" }) }));
};
export default Loader;
