import React from "react";
import { useDispatch } from 'react-redux';
import { ProductReaction } from '../ProductReaction/ProductReaction';
import { setSelectedProduct } from "src/store/actions";

import "./Product.css";

export const Product = ({ product }) => {
    const dispatch = useDispatch();
    const { id, title, picture, price, favorite } = product;

    const onProductHandle = () => {
        dispatch(setSelectedProduct(product));
    }

    return (
        <div className="product">
            <img
                className="product-preview image-responsive"
                src={picture}
                title={title}
                alt={title}
                onClick={onProductHandle}
            />
            <div className="product-data">
                <h3
                    className="product-title"
                    onClick={onProductHandle}>
                    {title.substring(0, 16) + '...'}
                </h3>
                <div
                    className="product-price"
                    onClick={onProductHandle}>
                    ${price}
                </div>
                <ProductReaction favorite={favorite} id={id} />
            </div>
        </div>
    )
}