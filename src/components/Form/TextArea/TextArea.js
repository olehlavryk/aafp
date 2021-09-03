import React from 'react';
import './TextArea.css';

export const TextArea = ({ children, ...props }) => {
  return (
    <textarea className="formAreaInput" {...props}>
      {children}
    </textarea>
  );
};