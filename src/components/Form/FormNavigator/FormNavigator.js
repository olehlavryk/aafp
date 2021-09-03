import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import "./FormNavigator.css"
import { setIsOpenLoginModal, setIsOpenRegisterModal } from 'src/store/actions';

export const FormNavigator = ({ title, textLink, linkTo }) => {
    const dispatch = useDispatch();

    const onClickHandle = useCallback(() => {
        dispatch(setIsOpenRegisterModal(false));
        dispatch(setIsOpenLoginModal(false));
    }, [])

    return (
        <div className="form-navigator" >
            <span className="form-navigator-title">{title}</span>
            <Link onClick={onClickHandle} to={linkTo}>{textLink}</Link>
        </div>
    )
}