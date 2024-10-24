import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React, { useEffect, useState, useRef } from 'react';
// import './Modal.css';
// import { FaMicrophone, FaTimes } from 'react-icons/fa';
// import { ReactMic } from 'react-mic';
// import LoaderModal from './loaderModal';
// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   patientId: string;
//   selectedSections: string[];
//   onSubmit: (result: any) => void;
// }
// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, patientId, selectedSections, onSubmit }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordings, setRecordings] = useState<string[]>([]);
//   const [transcript, setTranscript] = useState<string>('');
//   const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
//   const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);  // State for success message
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.continuous = true;
//       recognitionInstance.interimResults = true;
//       recognitionInstance.lang = 'en-US';
//       recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
//         let finalTranscript = '';
//         let interimTranscript = '';
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           if (event.results[i].isFinal) {
//             finalTranscript += event.results[i][0].transcript + ' ';
//           } else {
//             interimTranscript = event.results[i][0].transcript;
//           }
//         }
//         setTranscript((prev) => prev + finalTranscript);
//       };
//       recognitionInstance.onend = () => {};
//       setRecognition(recognitionInstance);
//     }
//   }, []);
//   const handleStartRecording = () => {
//     if (recognition) {
//       recognition.start();
//     }
//     setIsRecording(true);
//     setTranscript(''); // Clear transcript on new recording
//     setIsSubmitEnabled(false); // Disable submit while recording
//   };
//   const handleStopRecording = (recordedBlob: any) => {
//     setIsRecording(false);
//     setAudioBlob(recordedBlob.blob);
//     const audioUrl = URL.createObjectURL(recordedBlob.blob);
//     setRecordings((prev) => [...prev, audioUrl]);
//     if (recognition) recognition.stop();
//     setIsSubmitEnabled(true); // Enable submit after stopping recording
//   };
//   const handleCancel = () => {
//     setIsRecording(false);
//     setRecordings([]);
//     setTranscript('');
//     if (recognition) recognition.stop();
//     onClose();
//   };
//   const handleSubmit = async () => {
//     if (!audioBlob) {
//       setSuccessMessage('No audio recorded.');
//       setTimeout(() => {
//         setSuccessMessage(null); // Remove the message after 2 seconds
//       }, 2000);
//       return;
//     }
//     setIsLoading(true); // Start the loader
//     const formData = new FormData();
//     formData.append('audio', audioBlob, 'audio.wav');
//     formData.append('transcript', transcript); // Use the latest transcript
//     formData.append('pid', patientId);
//     formData.append('selectedSections', JSON.stringify(selectedSections)); // Send selected sections to the backend
//     try {
//       const response = await fetch('/OpenEMR/modules/sms_email_reminder/audiorecord_save.php', {
//         method: 'POST',
//         body: formData,
//       });
//       const result = await response.json();
//       if (response.ok) {
//         setSuccessMessage('Data uploaded successfully');
//         setRecordings([]);  // Clear the recordings
//         setTranscript('');  // Clear the transcript
//         setAudioBlob(null); // Clear the audio blob
//         setIsSubmitEnabled(false); // Reset submit button state
//         setTimeout(() => {
//           setSuccessMessage(null); // Automatically hide the success message after 2 seconds
//         }, 2000);
//         onSubmit(result); // Pass the API response to the parent component
//         onClose(); // Close the modal after success
//       } else {
//         setSuccessMessage('Error uploading data: ' + result.message);
//         setTimeout(() => {
//           setSuccessMessage(null); // Automatically hide the error message after 2 seconds
//         }, 2000);
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         setSuccessMessage('Error uploading data: ' + error.message);
//       } else {
//         setSuccessMessage('An unknown error occurred');
//       }
//       setTimeout(() => {
//         setSuccessMessage(null); // Automatically hide the error message after 2 seconds
//       }, 2000);
//     } finally {
//       setIsLoading(false); // Stop the loader once the request is completed
//     }
//   };
//   return (
//     isOpen ? (
//       <div className="modal-overlay">
//         <div className="modal-content">
//           {isLoading && <LoaderModal />} {/* Render the loader component */}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="modal-title">Audio Recorder</h2>
//             <button onClick={handleCancel} className="cancel-button">
//               <FaTimes />
//             </button>
//           </div>
//           <div className="controls flex items-center mb-4">
//             {isRecording ? (
//               <button onClick={() => setIsRecording(false)} className="stop-button">
//                 Stop Recording
//               </button>
//             ) : (
//               <button onClick={handleStartRecording} className="record-button">
//                 Start Recording
//               </button>
//             )}
//             <button 
//               onClick={handleSubmit} 
//               className={`submit-button ml-4 ${!isSubmitEnabled || isLoading ? 'disabled' : ''}`} 
//               disabled={!isSubmitEnabled || isLoading} // Disable if not recording or loading
//             >
//               {isLoading ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//           {/* Success/Error message */}
//           {successMessage && (
//             <div className="success-message">
//               {successMessage}
//             </div>
//           )}
//           <h3 className="text-transcript">Translates</h3>
//           <div className="transcripts-container">
//             <textarea
//               className="transcript"
//               value={transcript}
//               onChange={(e) => setTranscript(e.target.value)}
//               rows={5}
//               placeholder="Edit your transcript here..."
//             />
//           </div>
//           <div className="recordings-list">
//             {recordings.map((recording, index) => (
//               <div key={index} className="recording-item">
//                 <audio controls src={recording}></audio>
//               </div>
//             ))}
//           </div>
//           <ReactMic
//             record={isRecording}
//             className="sound-wave"
//             onStop={handleStopRecording}
//             strokeColor="#000000"
//             mimeType="audio/webm"
//             onData={() => {}}
//           />
//         </div>
//       </div>
//     ) : null
//   );
// };
// export default Modal;
// import React, { useEffect, useState } from 'react';
// import './Modal.css';
// import { FaMicrophone, FaTimes } from 'react-icons/fa';
// import { ReactMic } from 'react-mic';
// import LoaderModal from './loaderModal';
// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   patientId: string;
//   selectedSections: string[];
//   onSubmit: (result: any) => void;
// }
// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, patientId, selectedSections, onSubmit }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordings, setRecordings] = useState<string[]>([]);
//   const [transcript, setTranscript] = useState<string>('');  
//   const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
//   const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);  
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.continuous = true;
//       recognitionInstance.interimResults = true;  // Allows immediate transcription
//       recognitionInstance.lang = 'en-US';  // American English
//       recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
//         let interimTranscript = '';
//         let finalTranscript = '';
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           if (event.results[i].isFinal) {
//             finalTranscript += event.results[i][0].transcript + ' ';
//           } else {
//             interimTranscript += event.results[i][0].transcript;
//           }
//         }
//         // Update the transcript immediately with interim results
//         setTranscript((prevTranscript) => prevTranscript + finalTranscript + interimTranscript);
//       };
//       recognitionInstance.onerror = (event: { error: any; }) => {
//         console.error("Speech recognition error:", event.error);
//       };
//       setRecognition(recognitionInstance);
//     }
//   }, []);
//   const handleStartRecording = () => {
//     if (recognition) {
//       recognition.start();
//     }
//     setIsRecording(true);
//     setTranscript('');  // Clear previous transcript
//     setIsSubmitEnabled(false);
//   };
//   const handleStopRecording = (recordedBlob: any) => {
//     setIsRecording(false);
//     setAudioBlob(recordedBlob.blob);
//     const audioUrl = URL.createObjectURL(recordedBlob.blob);
//     setRecordings((prev) => [...prev, audioUrl]);
//     if (recognition) recognition.stop();
//     setIsSubmitEnabled(true);
//   };
//   const handleCancel = () => {
//     setIsRecording(false);
//     setRecordings([]);
//     setTranscript('');
//     if (recognition) recognition.stop();
//     onClose();
//   };
//   const handleSubmit = async () => {
//     if (!audioBlob) {
//       setSuccessMessage('No audio recorded.');
//       setTimeout(() => setSuccessMessage(null), 2000);
//       return;
//     }
//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append('audio', audioBlob, 'audio.wav');
//     formData.append('transcript', transcript);
//     formData.append('pid', patientId);
//     formData.append('selectedSections', JSON.stringify(selectedSections));
//     try {
//       const response = await fetch('/OpenEMR/modules/sms_email_reminder/audiorecord_save.php', {
//         method: 'POST',
//         body: formData,
//       });
//       const result = await response.json();
//       if (response.ok) {
//         setSuccessMessage('Data uploaded successfully');
//         setRecordings([]);
//         setTranscript('');
//         setAudioBlob(null);
//         setIsSubmitEnabled(false);
//         setTimeout(() => setSuccessMessage(null), 2000);
//         onSubmit(result);
//         onClose();
//       } else {
//         setSuccessMessage('Error uploading data: ' + result.message);
//         setTimeout(() => setSuccessMessage(null), 2000);
//       }
//     } catch (error) {
//       setSuccessMessage('Error uploading data: ' + (error instanceof Error ? error.message : 'Unknown error'));
//       setTimeout(() => setSuccessMessage(null), 2000);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     isOpen ? (
//       <div className="modal-overlay">
//         <div className="modal-content">
//           {isLoading && <LoaderModal />}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="modal-title">Audio Recorder</h2>
//             <button onClick={handleCancel} className="cancel-button">
//               <FaTimes />
//             </button>
//           </div>
//           <div className="controls flex items-center mb-4">
//             {isRecording ? (
//               <button onClick={() => setIsRecording(false)} className="stop-button">
//                 Stop Recording
//               </button>
//             ) : (
//               <button onClick={handleStartRecording} className="record-button">
//                 Start Recording
//               </button>
//             )}
//             <button 
//               onClick={handleSubmit} 
//               className={`submit-button ml-4 ${!isSubmitEnabled || isLoading ? 'disabled' : ''}`} 
//               disabled={!isSubmitEnabled || isLoading}
//             >
//               {isLoading ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//           {successMessage && <div className="success-message">{successMessage}</div>}
//           <h3 className="text-transcript">Translates</h3>
//           <div className="transcripts-container">
//             <textarea
//               className="transcript"
//               value={transcript}
//               onChange={(e) => setTranscript(e.target.value)}
//               rows={5}
//               placeholder="Edit your transcript here..."
//             />
//           </div>
//           <div className="recordings-list">
//             {recordings.map((recording, index) => (
//               <div key={index} className="recording-item">
//                 <audio controls src={recording}></audio>
//               </div>
//             ))}
//           </div>
//           <ReactMic
//             record={isRecording}
//             className="sound-wave"
//             onStop={handleStopRecording}
//             strokeColor="#000000"
//             mimeType="audio/webm"
//             onData={() => {}}
//           />
//         </div>
//       </div>
//     ) : null
//   );
// };
// export default Modal;
import { useEffect, useState } from 'react';
import './Modal.css';
import { FaTimes } from 'react-icons/fa';
import { ReactMic } from 'react-mic';
import LoaderModal from './loaderModal';
const Modal = ({ isOpen, onClose, patientId, selectedSections, onSubmit }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordings, setRecordings] = useState([]);
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState(''); // For temporary display
    const [recognition, setRecognition] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true; // Allows immediate transcription
            recognitionInstance.lang = 'en-US'; // American English
            recognitionInstance.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                    else {
                        interimTranscript = event.results[i][0].transcript;
                    }
                }
                // Append only final results to the transcript and display interim ones temporarily
                setTranscript((prevTranscript) => prevTranscript + finalTranscript);
                setInterimTranscript(interimTranscript); // Show interim transcript
            };
            recognitionInstance.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
            };
            setRecognition(recognitionInstance);
        }
    }, []);
    const handleStartRecording = () => {
        if (recognition) {
            recognition.start();
        }
        setIsRecording(true);
        setTranscript(''); // Clear previous transcript
        setInterimTranscript(''); // Clear interim transcript
        setIsSubmitEnabled(false);
    };
    const handleStopRecording = (recordedBlob) => {
        setIsRecording(false);
        setAudioBlob(recordedBlob.blob);
        const audioUrl = URL.createObjectURL(recordedBlob.blob);
        setRecordings((prev) => [...prev, audioUrl]);
        if (recognition)
            recognition.stop();
        setIsSubmitEnabled(true);
        setInterimTranscript(''); // Clear interim transcript when stopping recording
    };
    const handleCancel = () => {
        setIsRecording(false);
        setRecordings([]);
        setTranscript('');
        setInterimTranscript('');
        if (recognition)
            recognition.stop();
        onClose();
    };
    const handleSubmit = async () => {
        if (!audioBlob) {
            setSuccessMessage('No audio recorded.');
            setTimeout(() => setSuccessMessage(null), 2000);
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.wav');
        formData.append('transcript', transcript);
        formData.append('pid', patientId);
        formData.append('selectedSections', JSON.stringify(selectedSections));
        try {
            const response = await fetch('/OpenEMR/modules/sms_email_reminder/audiorecord_save.php', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Data uploaded successfully');
                setRecordings([]);
                setTranscript('');
                setAudioBlob(null);
                setIsSubmitEnabled(false);
                setTimeout(() => setSuccessMessage(null), 2000);
                onSubmit(result);
                onClose();
            }
            else {
                setSuccessMessage('Error uploading data: ' + result.message);
                setTimeout(() => setSuccessMessage(null), 2000);
            }
        }
        catch (error) {
            setSuccessMessage('Error uploading data: ' + (error instanceof Error ? error.message : 'Unknown error'));
            setTimeout(() => setSuccessMessage(null), 2000);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (isOpen ? (_jsx("div", { className: "modal-overlay", children: _jsxs("div", { className: "modal-content", children: [isLoading && _jsx(LoaderModal, {}), _jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "modal-title", children: "Audio Recorder" }), _jsx("button", { onClick: handleCancel, className: "cancel-button", children: _jsx(FaTimes, {}) })] }), _jsxs("div", { className: "controls flex items-center mb-4", children: [isRecording ? (_jsx("button", { onClick: () => setIsRecording(false), className: "stop-button", children: "Stop Recording" })) : (_jsx("button", { onClick: handleStartRecording, className: "record-button", children: "Start Recording" })), _jsx("button", { onClick: handleSubmit, className: `submit-button ml-4 ${!isSubmitEnabled || isLoading ? 'disabled' : ''}`, disabled: !isSubmitEnabled || isLoading, children: isLoading ? 'Submitting...' : 'Submit' })] }), successMessage && _jsx("div", { className: "success-message", children: successMessage }), _jsx("h3", { className: "text-transcript", children: "Translates" }), _jsx("div", { className: "transcripts-container", children: _jsx("textarea", { className: "transcript", value: transcript + interimTranscript, onChange: (e) => setTranscript(e.target.value), rows: 5, placeholder: "Edit your transcript here..." }) }), _jsx("div", { className: "recordings-list", children: recordings.map((recording, index) => (_jsx("div", { className: "recording-item", children: _jsx("audio", { controls: true, src: recording }) }, index))) }), _jsx(ReactMic, { record: isRecording, className: "sound-wave", onStop: handleStopRecording, strokeColor: "#000000", mimeType: "audio/webm", onData: () => { } })] }) })) : null);
};
export default Modal;
