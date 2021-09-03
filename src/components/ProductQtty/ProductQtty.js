import React from "react";
import "./ProductQtty.css";

export const ProductQtty = ({ minusHandle, qtty, plusHandle }) => {
    return (
        <div className="product-qtty">
            <div className="qtty-minus" onClick={minusHandle}>-</div>
            <div className="qtty-value">{qtty}</div>
            <div className="qtty-plus" onClick={plusHandle}>+</div>
        </div>
    )
}