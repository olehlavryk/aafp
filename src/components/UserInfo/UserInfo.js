import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, Link, Redirect, useHistory } from "react-router-dom";
import { ViewerLogo } from "src/components/ViewerLogo/ViewerLogo";
import { logout } from "src/store/actions";
import { userSelector } from "src/store/selectors";
import { getUser } from "src/utils/common"
import "./UserInfo.css";

export const UserInfo = (props) => {
    const history = useHistory();
    const [state, setState] = useState({ open: false });
    const [user, setUser] = useState(useSelector(userSelector));

    useEffect(() => {
        if (!user) {
            setUser(getUser());
        }
    }, []);

    const dispatch = useDispatch();
    const toggleDropDown = () => {
        setState({ open: !state.open });
    };

    function useOutsideClick(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setState({ open: false });
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    const logoutHandle = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push(generatePath("/login"));
    }

    return (

        <div className="user_info" ref={wrapperRef}>
            {
                user && (
                    <div className="user_info_line">
                        <span className="short_user_name">{`Welcome, ${user.fullName.split(" ")[0]}!`}</span>
                        <ViewerLogo user={user} onClick={toggleDropDown} withArrow={true} />
                    </div>
                )
            }


            {state.open && user && (
                <div className="user_info_dropdown">
                    <div className="user_details_box">
                        <div className="user_profile">
                            <div className="user_name">
                                {user.fullName}
                            </div>
                            <div className="user_email">
                                {user.email}
                            </div>
                        </div>
                    </div>

                    <ul className="profile_menu">
                        <li>
                            <Link to="/account">Settings</Link>
                        </li>
                        <li>
                            <a href="#"
                                className="logout_link"
                                onClick={(e) => logoutHandle(e)}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};