// SpinnerOne.jsx

import React from "react";
import "./SpinnerOne.css";

const SpinnerOne = () => {
    return (
        <div className="spinner-border text-primary spinner-one" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default SpinnerOne