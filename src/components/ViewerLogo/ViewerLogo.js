import React from "react";
import { Icon } from "../Icons/Icon";
import "./ViewerLogo.css";

export const ViewerLogo = ({ withArrow, ...props }) => {
  const { user } = props;

  let initials = user.fullName.match(/\b\w/g) || [];
  initials = (
    (initials.shift() || "") + (initials.pop() || "")
  ).toUpperCase();

  return (
    <div className="viewer_box" {...props}>
      {user.avatar != null ? (
        <img
          className="viewer_avatar"
          src={user.avatar}
          alt={user.fullName}
        />
      ) : (
        <div className="viewer_without_avatar">{initials}</div>
      )}
      {
        withArrow && (
          <div className="chevron_down_icon">
            <Icon name="chevron_down" />
          </div>
        )
      }

    </div>
  );
};
