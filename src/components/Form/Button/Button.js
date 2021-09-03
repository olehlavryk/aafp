import React from "react";
import { Icon } from "src/components/Icons/Icon";
import './Button.css'

export const Button = ({ children, icon, ...props }) => {
  return (
    <button
      {...props}
      className={`
        ${icon ? "with-icon" : ""}
        ${props.type === "outline" ? "btn-outline" : ""}
        ${props.className ? props.className : ""}
      `}
    >
      {children}
      {icon && (<Icon name={icon} />)}
    </button>
  );
}
