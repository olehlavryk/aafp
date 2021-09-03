import React from 'react';
import './Label.css';

export const Label = ({ children, htmlFor, required = false }) => {
  return (
    <label htmlFor={htmlFor} className="formLabel">
      {children}
      {required ? <span className="required_star">*</span> : null}
    </label>
  );
};