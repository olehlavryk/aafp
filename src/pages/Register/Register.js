import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { FormNavigator } from "src/components/Form/FormNavigator/FormNavigator";
import { setLoading } from "src/store/actions";
import { isLoggedSelector, loadingSelector } from "src/store/selectors";
import { RegisterForm } from "./components/RegisterForm/RegisterForm";
import "./Register.css";

export const Register = () => {
    const loading = useSelector(loadingSelector);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(isLoggedSelector);

    useEffect(() => {
        dispatch(setLoading(false));
    }, [])

    if (isLoggedIn) {
        return <Redirect to="/" />
    }

    if (loading) {
        return (
            <div className={`loader-wrapper theme-light`}>
                <div className="loader" />
            </div>
        )
    }

    return (
        <div className="register-page">
            <RegisterForm />
            <FormNavigator
                title="I already have an account,"
                textLink="Log in"
                linkTo="/login"
            />
        </div>
    )
}