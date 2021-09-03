import React, { useState } from "react";
import { Formik } from "formik";
import { TextInput } from "src/components/Form/TextInput/TextInput";
import { Button } from "src/components/Form/Button/Button";
import { UserChangePasswordSchema } from "./UserChangePasswordSchema";
import { useDispatch } from "react-redux";
import { initUser, setNotification, updatePassword } from "src/store/actions";
import "./UserChangePasswordForm.css";
import { PasswordInput } from "src/components/Form/PasswordInput/PasswordInput";

export const UserChangePasswordForm = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        errorMessage: null,
    });

    const initialValues = {
        oldPassword: "",
        password: "",
        confirmPassword: "",
    }

    const onSubmit = async (values, resetForm) => {
        const { oldPassword, password } = values;

        try {
            await dispatch(updatePassword({ oldPassword, password }));
            dispatch(setNotification("Password has updated successfully"));
            resetForm(initialValues);
        } catch (err) {
            if (err.response.status === 401) {
                setState({
                    errorMessage:
                        "Current password incorrect",
                });
            } else if (err.response.status === 404) {
                setState({
                    errorMessage: "Something goes wrong! Not host found.",
                });
            }
            else {
                setState({
                    errorMessage: "Something goes wrong! Please try again.",
                });
            }
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={UserChangePasswordSchema}
            onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form className="user-change-password-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <PasswordInput
                            name="oldPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.oldPassword}
                            placeholder="Current password"
                            className={(errors.oldPassword && touched.oldPassword) ? "errors_outline" : ""}
                        />
                        {errors.oldPassword && touched.oldPassword ? (
                            <span className="errors_small">
                                {errors.oldPassword && touched.oldPassword && errors.oldPassword}
                            </span>
                        ) : null}
                    </div>

                    <div className="form-row">
                        <PasswordInput
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="New password"
                            className={(errors.password && touched.password) ? "errors_outline" : ""}
                        />
                        {errors.password && touched.password ? (
                            <span className="errors_small">
                                {errors.password && touched.password && errors.password}
                            </span>
                        ) : null}
                    </div>
                    <div className="form-row">
                        <PasswordInput
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            placeholder="Confirm password"
                            className={(errors.confirmPassword && touched.confirmPassword) ? "errors_outline" : ""}
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <span className="errors_small">
                                {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                            </span>
                        ) : null}
                    </div>

                    {!!state.errorMessage && <span className="errors_small">{state.errorMessage}</span>}

                    <Button
                        disabled={
                            isSubmitting ||
                            (
                                errors.confirmPassword ||
                                errors.password ||
                                errors.oldPassword
                            )
                        }
                        type="submit"
                        className="btn"
                    >
                        {isSubmitting ? "Loading..." : "Change password"}
                    </Button>

                </form>
            )
            }
        </Formik>
    )
}