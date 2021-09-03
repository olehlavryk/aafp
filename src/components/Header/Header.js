import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "src/components/Icons/Icon";
import { setIsOpenLoginModal, setIsOpenRegisterModal } from "src/store/actions";
import { cartCounterSelector, isLoggedSelector, isOpenLoginModalSelector, isOpenRegisterModalSelector, notificationSelector } from "src/store/selectors";
import { RegisterForm } from 'src/pages/Register/components/RegisterForm/RegisterForm';
import { LoginForm } from "src/pages/Login/components/LoginForm/LoginForm";
import { Modal } from "src/components/Modal/Modal";
import { FormNavigator } from "src/components/Form/FormNavigator/FormNavigator";
import { UserInfo } from "src/components/UserInfo/UserInfo";


import "./Header.css";

export const Header = () => {
    const dispatch = useDispatch();
    const cartCounter = useSelector(cartCounterSelector);
    const isOpenLoginModal = useSelector(isOpenLoginModalSelector);
    const isOpenRegisterModal = useSelector(isOpenRegisterModalSelector);
    const [isLoggedIn, setIsLoggedIn] = useState(useSelector(isLoggedSelector));
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("__token"));
    }, [!!localStorage.getItem("__token")])

    const onRegisterHandle = useCallback(() => {
        dispatch(setIsOpenLoginModal(false));
        dispatch(setIsOpenRegisterModal(true));
    }, []);

    const onLoginHandle = useCallback(() => {
        dispatch(setIsOpenRegisterModal(false));
        dispatch(setIsOpenLoginModal(true));
    }, []);

    const onLoginClose = useCallback(() => {
        dispatch(setIsOpenLoginModal(false))
    }, []);

    const onRegisterClose = useCallback(() => {
        dispatch(setIsOpenRegisterModal(false))
    }, []);


    return (
        <header id="header">
            <div className="header-container">
                <div className="logo-box">
                    <Link to="/">
                        <Icon name="logo" />
                    </Link>
                </div>
                <div className="header-info-box">
                    <ul className="icons-group">
                        <li>
                            <Link to="/account">
                                <Icon name="favorite" />
                            </Link>

                        </li>
                        <li>
                            <div className="cart-wrapper">
                                {isLoggedIn && cartCounter > 0 ? (<span className="cart-counter">{`${cartCounter}`}</span>) : null}
                                <Link to="/cart">
                                    <Icon name="cart" />
                                </Link>
                            </div>
                        </li>
                    </ul>
                    {
                        !isLoggedIn && (
                            <ul className="menu">
                                <li onClick={onRegisterHandle}>
                                    Register
                                </li>
                                <li onClick={onLoginHandle}>
                                    Login
                                </li>
                            </ul>
                        )
                    }

                    {
                        isLoggedIn && (
                            <UserInfo />
                        )
                    }

                </div>
            </div>
            {
                !isLoggedIn && isOpenRegisterModal && (
                    <Modal isOpen={!isLoggedIn && isOpenRegisterModal} onClose={onRegisterClose}>
                        <RegisterForm />
                        <FormNavigator
                            title="I already have an account,"
                            textLink="Log in"
                            linkTo="/login"
                        />
                    </Modal>
                )
            }

            {
                !isLoggedIn && isOpenLoginModal && (
                    <Modal isOpen={!isLoggedIn && isOpenLoginModal} onClose={onLoginClose}>
                        <LoginForm />
                        <FormNavigator
                            title="I have no account,"
                            textLink="Register now"
                            linkTo="/register"
                        />
                    </Modal>
                )
            }
        </header>
    )
}