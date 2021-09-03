import React from "react";
import { generatePath, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setIsOpenFavoriteModal, setIsOpenLoginModal, setIsOpenRegisterModal, setOrdered } from "src/store/actions";
import { Button } from "src/components/Form/Button/Button";
import "./OrderActions.css";

export const OrderActions = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const closeAllModal = () => {
        dispatch(setIsOpenFavoriteModal(false));
        dispatch(setIsOpenLoginModal(false));
        dispatch(setIsOpenRegisterModal(false));
        dispatch(setOrdered(null));
    }

    const viewHistoryHandle = () => {
        closeAllModal();
        history.push(generatePath("/settings"));
    }

    const continueShoppingHandler = () => {
        closeAllModal();
        history.push(generatePath("/"));
    }
    return (
        <div className="order-actions">
            <div className="order-actions-text">
                <h3 className="order-actions-title">
                    Thank you for your purchase
                    </h3>
                <div className="order-actions-desc">
                    We will send you a notification when your order arrives to you
                </div>
            </div>

            <div className="btns-wrapper">
                <Button onClick={continueShoppingHandler}>Continue shopping</Button>
                <Button
                    type="outline"
                    onClick={viewHistoryHandle}
                >
                    View order history
                </Button>
            </div>
        </div>
    )
}