import React from "react";
import "./OrderProduct.css";

export const OrderProduct = ({ order }) => {

    const { orderedPrice, product, quantity, } = order;

    return (
        <div className="order-product">
            <img src={product.picture} alt={product.title} className="product-image" />
            <div className="order-details">
                <h4 className="order-title">{product.title.substring(0, 60) + '...'}</h4>
                <div className="order-qtty-box">
                    <div className="order-qtty-title">
                        Items:
                    </div>
                    <div className="order-qtty">
                        {quantity}
                    </div>
                </div>
            </div>
            <div className="order-prices">
                <div className="order-prices-title">Price:</div>
                <div className="order-prices-value">${orderedPrice}</div>
            </div>
        </div>
    )
}
