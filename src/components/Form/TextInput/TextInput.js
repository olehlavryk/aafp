import React from 'react';
import { Icon } from 'src/components/Icons/Icon';
import './TextInput.css';

export const TextInput = ({ value, type = "text", icon = "", ...props }) => {
  return (
    <>
      <div className={`${icon !== "" ? "with-icon" : ""} input-wrapper`}>
        {icon && (<Icon name={icon} />)}
        <input
          type={type}
          value={value}
          {...props}
        />
      </div>

    </>
  );
};