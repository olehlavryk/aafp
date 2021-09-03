import React from "react";
import { Icon } from "src/components/Icons/Icon";
import "./Select.css";

export const Select = ({ children, icon, ...props }) => {
    return (
        <div className={`${icon ? "with-icon" : ""} select-wrapper`}>
            {icon && (<Icon name={icon} />)}
            <select {...props}>
                {children}
            </select>
        </div>

    )
}
