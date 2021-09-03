import React from "react";
import { useSelector } from "react-redux";
import { isLoggedSelector, userSelector } from "src/store/selectors";
import { UserStatistics } from "./components/UserStatistics/UserStatistics";
import "./Account.css";
import { Redirect } from "react-router";


export const Account = () => {
    const isLoggedIn = useSelector(isLoggedSelector);
    const user = useSelector(userSelector);

    if (!isLoggedIn) {
        return <Redirect to="/login" />
    }

    return (
        <div className="account-page">
            <UserStatistics user={user} />
        </div>
    );
}