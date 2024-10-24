import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from "react";
import "./styles/styles.css";
import RefreshLogo from "../assets/refreshLogo.svg";
import EyeClosed from '../assets/closedEye.svg';
import EyeOpen from '../assets/openEye.svg';
const Login = () => {
    const [time, setTime] = useState(getFormattedTime());
    const [formState, setFormState] = useState({ authUser: "", clearPass: "" });
    const [error, setError] = useState("");
    const [passwordToggle, setPasswordToggle] = useState(false);
    const [imageQuote, setImageQuote] = useState({ image_path: "", quote: "" });
    const updateFormattedTime = useCallback(() => {
        setTime(getFormattedTime());
    }, []);
    useEffect(() => {
        fetchRandomImageQuote();
        const intervalID = setInterval(updateFormattedTime, 1000);
        return () => clearInterval(intervalID);
    }, [updateFormattedTime]);
    const fetchRandomImageQuote = async () => {
        try {
            const timestamp = new Date().getTime(); // Get current timestamp
            const hostname = window.location.hostname;
            const baseUrl = `https://${hostname}`;
            const url = `${baseUrl}/sites/randomImageQuote.php?timestamp=${timestamp}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data from server');
            }
            const data = await response.json();
            setImageQuote(data); // Update image path in state
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching random image and quote:', error.message);
            }
            else {
                console.error('Error fetching random image and quote:', error);
            }
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.authUser || !formState.clearPass) {
            setError("Both fields are required");
        }
        else {
            setError("");
            // Handle form submission
            console.log("Form submitted", formState);
            // Optionally, you can add the form submission logic here
            const form = e.target;
            form.submit();
        }
    };
    const togglePasswordVisibility = () => {
        setPasswordToggle(!passwordToggle);
    };
    return (_jsxs("div", { className: "container-div", children: [_jsx("div", { className: "infoContainer", style: { backgroundImage: `url(${imageQuote.image_path})` }, children: _jsxs("label", { children: ["\"", imageQuote.quote, "\""] }) }), _jsx("div", { className: "loginFormContainer ", children: _jsxs("div", { children: [_jsxs("div", { className: "formHeader", children: [_jsxs("div", { className: "leftContent", children: [_jsx("img", { src: RefreshLogo, alt: "Logo" }), _jsx("p", { children: "Connecting Care, Improving Outcomes" })] }), _jsx("div", { className: "rightContent", children: _jsx("div", { className: "formClock", "aria-live": "polite", children: time }) })] }), _jsxs("form", { className: "loginForm", onSubmit: handleSubmit, method: "POST", id: "login_form", autoComplete: "off", action: `../main/main_screen.php?auth=login&site=dev`, target: "_top", name: "login_form", children: [error && _jsx("p", { className: "error", role: "alert", children: error }), _jsx("input", { type: "hidden", name: "new_login_session_management", value: "1" }), _jsx("input", { type: "hidden", name: "authProvider", value: "Default" }), _jsx("input", { type: "hidden", name: "languageChoice", value: "1" }), _jsx("label", { htmlFor: "username", children: "User name" }), _jsx("input", { type: "text", id: "authUser", name: "authUser", className: "inputField", required: true, onChange: handleChange, value: formState.authUser, "aria-required": "true" }), _jsx("label", { htmlFor: "password", children: "Password" }), _jsxs("div", { className: "inputContainer", children: [_jsx("input", { type: passwordToggle ? "text" : "password", id: "clearPass", name: "clearPass", className: "inputField", required: true, onChange: handleChange, value: formState.clearPass, "aria-required": "true" }), _jsx("img", { onClick: togglePasswordVisibility, src: passwordToggle ? EyeOpen : EyeClosed, className: "endAdornment", alt: "Toggle password visibility" })] }), _jsx("a", { href: "#", children: "Forgot password" }), _jsx("button", { type: "submit", children: "Login" })] })] }) })] }));
};
const getFormattedTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
};
export default Login;
