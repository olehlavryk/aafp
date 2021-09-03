import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartProduct } from "./components/CartProduct/CartProduct";
import { cartCounterSelector, cartSelector, userSelector, orderedSelector } from "src/store/selectors";
import { setCart, setCartCounter, setOrdered } from "src/store/actions";
import { getCartProducts } from "src/utils/common";
import { CartForm } from "./components/CartForm/CartForm";
import { Modal } from "src/components/Modal/Modal";
import { OrderActions } from "src/components/OrderActions/OrderActions";
import { NoResults } from "src/components/NoResults/NoResults";
import "./Cart.css";

export const Cart = () => {
    const dispatch = useDispatch();
    const cartCounter = useSelector(cartCounterSelector);
    const products = useSelector(cartSelector);
    const user = useSelector(userSelector);
    const ordered = useSelector(orderedSelector);

    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState(cartCounter);

    useEffect(() => {
        dispatch(setCart(getCartProducts()));
    }, []);

    useEffect(() => {
        let sum = products.reduce(function (total, currentValue) {
            return total + (currentValue.product.price * currentValue.qtty);
        }, 0);

        setTotalPrice(sum);

        dispatch(setCartCounter(products.length));
        setCartItems(products.length);
    }, [products]);

    const orderCloseHandle = () => {
        dispatch(setOrdered(null));
    }

    return (
        <div className="cart-page">
            <div className="cart-title">
                My Cart
            </div>
            <div className="cart-blocks">
                <div className="cart-left">
                    {
                        products.length ? (
                            <div className="products-list">
                                {products.map((item) => {
                                    return (
                                        <CartProduct product={item} key={item?.product?.id} />
                                    )
                                })}
                            </div>
                        ) : (
                            <NoResults
                                title="There are no items in a cart!"
                                description="Try to came back to home page and add continue shopping."
                                extraStyles={{ "margin": "209px auto 0 auto", "max-width": "347px" }}
                            />
                        )
                    }

                </div>
                <div className="cart-right">
                    {
                        user && (
                            <CartForm user={user} items={cartItems} price={totalPrice} />
                        )
                    }
                </div>
            </div>
            {
                ordered && (
                    <Modal isOpen={ordered} onClose={orderCloseHandle}>
                        <OrderActions />
                    </Modal>
                )
            }
        </div>
    );
}