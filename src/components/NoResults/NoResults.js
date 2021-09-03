import React from "react";
import "./NoResults.css";

export const NoResults = ({ title, description, extraStyles }) => {
    return (
        <div className="no-results-empty" style={{ ...extraStyles }}>
            <h4 className="no-results-empty-title">{title}</h4>
            <div className="no-results-empty-desc">
                {description}
            </div>
        </div>
    )
}

