import React, { useEffect, useState, useCallback, FormEvent, ChangeEvent } from "react";
import "./styles/styles.css";
import RefreshLogo from "../assets/refreshLogo.svg";
import EyeClosed from '../assets/closedEye.svg';
import EyeOpen from '../assets/openEye.svg';

interface FormState {
  authUser: string;
  clearPass: string;
}

const Login: React.FC = () => {
  const [time, setTime] = useState<string>(getFormattedTime());
  const [formState, setFormState] = useState<FormState>({ authUser: "", clearPass: "" });
  const [error, setError] = useState<string>("");
  const [passwordToggle, setPasswordToggle] = useState<boolean>(false);
  const [imageQuote, setImageQuote] = useState<{ image_path: string, quote: string }>({ image_path: "", quote: "" });

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching random image and quote:', error.message);
      } else {
        console.error('Error fetching random image and quote:', error);
      }
    }
  };
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!formState.authUser || !formState.clearPass) {
      setError("Both fields are required");
    } else {
      setError("");
      // Handle form submission
      console.log("Form submitted", formState);
      // Optionally, you can add the form submission logic here
      const form = e.target as HTMLFormElement;
      form.submit();
    }
  };

  const togglePasswordVisibility = (): void => {
    setPasswordToggle(!passwordToggle);
  };

  return (
    <div className="container-div">
      {/* <div className="infoContainer">
        <img src={imageQuote.image_path} className="dynamicImage" alt="Random Image" loading="lazy" /> */}
         <div className="infoContainer" style={{ backgroundImage: `url(${imageQuote.image_path})` }}>
        <label>"{imageQuote.quote}"</label>
      </div>
      <div className="loginFormContainer ">
        <div>
          <div className="formHeader">
            <div className="leftContent">
              <img src={RefreshLogo} alt="Logo" />
              <p>Connecting Care, Improving Outcomes</p>
            </div>
            <div className="rightContent">
              <div className="formClock" aria-live="polite">{time}</div>
            </div>
          </div>
          <form
            className="loginForm"
            onSubmit={handleSubmit}
            method="POST"
            id="login_form"
            autoComplete="off"
            action={`../main/main_screen.php?auth=login&site=dev`}
            target="_top"
            name="login_form"
          >
            {error && <p className="error" role="alert">{error}</p>}
            <input type="hidden" name="new_login_session_management" value="1" />
            <input type="hidden" name="authProvider" value="Default" />
            <input type="hidden" name="languageChoice" value="1" />
            <label htmlFor="username">User name</label>
            <input
              type="text"
              id="authUser"
              name="authUser"
              className="inputField"
              required
              onChange={handleChange}
              value={formState.authUser}
              aria-required="true"
            />
            <label htmlFor="password">Password</label>
            <div className="inputContainer">
              <input
                type={passwordToggle ? "text" : "password"}
                id="clearPass"
                name="clearPass"
                className="inputField"
                required
                onChange={handleChange}
                value={formState.clearPass}
                aria-required="true"
              />
              <img
                onClick={togglePasswordVisibility}
                src={passwordToggle ? EyeOpen : EyeClosed}
                className="endAdornment"
                alt="Toggle password visibility"
              />
            </div>
            <a href="#">Forgot password</a>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const getFormattedTime = (): string => {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
};

export default Login;
