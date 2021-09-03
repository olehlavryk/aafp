import React from "react";
import { useDispatch } from "react-redux";
import { setIsOpenFavoriteModal, setIsOpenLoginModal, setIsOpenRegisterModal } from "src/store/actions";
import { Button } from "src/components/Form/Button/Button";
import "./UserActions.css";

export const UserActions = () => {
    const dispatch = useDispatch();

    const singInHandle = () => {
        dispatch(setIsOpenFavoriteModal(false));
        dispatch(setIsOpenLoginModal(true));
    }
    const singUpHandle = () => {
        dispatch(setIsOpenFavoriteModal(false));
        dispatch(setIsOpenRegisterModal(true));
    }
    const continueHandle = () => {
        dispatch(setIsOpenFavoriteModal(false));
    }
    return (
        <div className="user-actions">
            <h3 className="modal-title">To continue please register or log in</h3>
            <div className="btns-wrapper">
                <Button onClick={singInHandle}>Continue to sign in</Button>
                <Button onClick={singUpHandle}>Continue to register</Button>
                <Button
                    type="outline"
                    onClick={continueHandle}
                >
                    Continue as guest
                </Button>
            </div>
        </div>
    )
}