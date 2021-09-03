import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "src/components/Icons/Icon";
import { ProductQtty } from "src/components/ProductQtty/ProductQtty";
import { cartSelector } from "src/store/selectors";
import { setCart } from "src/store/actions";
import "./CartProduct.css";
import { removeEntry } from "src/utils/common";

export const CartProduct = ({ product }) => {
    const dispatch = useDispatch();

    const { id, title, description, picture, price, favorite } = product.product;
    const [qtty, setQtty] = useState(product.qtty);

    const cart = useSelector(cartSelector);

    const updtedQtty = useCallback(() => {
        const updatedCart = cart.map(
            item => id === item.product.id ? { ...item, qtty } : item
        );

        dispatch(setCart(updatedCart));
    }, [qtty, cart])

    useEffect(() => {
        updtedQtty();
    }, [qtty])

    const minusHandle = useCallback(() => {
        if (qtty <= 1) return;

        setQtty(qtty - 1);
    }, [qtty]);

    const plusHandle = useCallback(() => {
        setQtty(qtty + 1);
    }, [qtty]);

    const removeHandle = (id) => {
        const filtered = cart.filter(item => item.product.id !== id);
        dispatch(setCart(filtered));
        removeEntry(id);
    }

    return (
        <div className="cart-product">
            <img src={picture} alt={title} className="product-image" />
            <div className="product-details">
                <h4 className="product-title">{title}</h4>
                <div className="product-contorls">
                    <div className="remove-wrapper" onClick={() => removeHandle(id)}>
                        <Icon name="remove" />
                    </div>
                    <ProductQtty minusHandle={minusHandle} qtty={qtty} plusHandle={plusHandle} />
                </div>

            </div>
            <div className="product-prices">
                <div className="product-prices-title">Price:</div>
                <div className="product-prices-value">${price * qtty}</div>
            </div>
        </div>
    )
}
