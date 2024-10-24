import React from 'react';
import './loaderModal.css'; // Make sure this CSS file exists and is linked correctly

const LoaderModal: React.FC = () => (
  <div className="loader-modal">
    <div className="spinner"></div>
    <div className="loading-text">Loading...</div>
  </div>
);

export default LoaderModal;
