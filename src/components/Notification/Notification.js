import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "src/store/actions";
import { Icon } from "../Icons/Icon";
import { VISIBILITYTIME } from "src/utils/config";
import "./Notification.css";

export const Notification = ({ notification }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => closeHandle(), VISIBILITYTIME);
    }, []);

    const closeHandle = () => {
        dispatch(setNotification(null));
    }

    return (
        <div className="cart-notification">
            <div dangerouslySetInnerHTML={{ __html: notification }} />
            <div className="close-notification-wrapper">
                <Icon name="modalClose" size={20} onClick={closeHandle} />
            </div>
        </div>
    )
}