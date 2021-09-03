import React, { useState } from "react";
import { Icon } from 'src/components/Icons/Icon'
import './PasswordInput.css';

export const PasswordInput = ({ value, ...props }) => {
  const [passwordHidden, setPasswordHidden] = useState(true)

  const passwordSwitch = () => {
    setPasswordHidden(!passwordHidden)
  }

  return (
    <div className="passwordFieldWrapper">
      <input
        type={passwordHidden ? 'password' : 'text'}
        className="formPasswordInput"
        value={value}
        {...props}
      />
      <span className="showPassword">
        <Icon name="eye" onClick={passwordSwitch} />
      </span>
    </div>
  )
}