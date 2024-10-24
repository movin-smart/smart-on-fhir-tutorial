import { jsx as _jsx } from "react/jsx-runtime";
import Dashboard from './pages/dashboard';
const App = () => {
    const fhirData = {}; // Replace with your actual data
    return (_jsx("div", { children: _jsx(Dashboard, { fhirData: fhirData }) }));
};
export default App;
