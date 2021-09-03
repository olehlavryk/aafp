import React, { useState } from "react";
import { Formik } from "formik";
import { TextInput } from "src/components/Form/TextInput/TextInput";
import { Button } from "src/components/Form/Button/Button";
import { UserAccountSchema } from "./UserAccountSchema";
import { useDispatch } from "react-redux";
import { initUser, setNotification, updateAccount } from "src/store/actions";
import "./UserAccountForm.css";

export const UserAccountForm = ({ user }) => {
    const dispatch = useDispatch();
    const { fullName, email, phone, country, city, address } = user;
    const [state, setState] = useState({
        errorMessage: null,
    });

    const initialValues = {
        fullName: fullName || "",
        email: email || "",
        phone: phone || "",
        country: country || "",
        city: city || "",
        address: address || ""
    }

    const onSubmit = async (values, resetForm) => {
        const { fullName, email, phone, country, city, address } = values;

        try {
            const request = await dispatch(updateAccount({ fullName, email, phone, country, city, address }));
            dispatch(initUser(request.data));
            dispatch(setNotification("Account details are updated successfully"));
        } catch (err) {
            if (err.response.status === 404) {
                setState({
                    errorMessage:
                        "Whoops, something went wrong, not found",
                });
            } else if (err.response.status === 409) {
                setState({
                    errorMessage: "Something goes wrong! Invalid country",
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
            validationSchema={UserAccountSchema}
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
                і }) => (
                <form className="user-account-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <TextInput
                            type="text"
                            name="fullName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fullName}
                            placeholder="Full Name"
                            className={(errors.fullName && touched.fullName) ? "errors_outline" : ""}
                        />
                        {errors.fullName && touched.fullName ? (
                            <span className="errors_small">
                                {errors.fullName && touched.fullName && errors.fullName}
                            </span>
                        ) : null}
                    </div>
                    <div className="form-row">
                        <TextInput
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Email"
                            className={(errors.email && touched.email) ? "errors_outline" : ""}
                        />
                        {errors.email && touched.email ? (
                            <span className="errors_small">
                                {errors.email && touched.email && errors.email}
                            </span>
                        ) : null}
                    </div>
                    <div className="form-row">
                        <TextInput
                            type="text"
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            placeholder="Phone"
                            className={(errors.phone && touched.phone) ? "errors_outline" : ""}
                        />
                        {errors.phone && touched.phone ? (
                            <span className="errors_small">
                                {errors.phone && touched.phone && errors.phone}
                            </span>
                        ) : null}
                    </div>
                    <div className="form-row">
                        <TextInput
                            type="text"
                            name="country"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.country}
                            placeholder="Country"
                            className={(errors.country && touched.country) ? "errors_outline" : ""}
                        />
                        {errors.country && touched.country ? (
                            <span className="errors_small">
                                {errors.country && touched.country && errors.country}
                            </span>
                        ) : null}
                    </div>

                    <div className="form-row">
                        <TextInput
                            type="text"
                            name="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            placeholder="City"
                            className={(errors.city && touched.city) ? "errors_outline" : ""}
                        />
                        {errors.city && touched.city ? (
                            <span className="errors_small">
                                {errors.city && touched.city && errors.city}
                            </span>
                        ) : null}
                    </div>
                    <div className="form-row">
                        <TextInput
                            type="text"
                            name="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            placeholder="Address"
                            className={(errors.address && touched.address) ? "errors_outline" : ""}
                        />
                        {errors.address && touched.address ? (
                            <span className="errors_small">
                                {errors.address && touched.address && errors.address}
                            </span>
                        ) : null}
                    </div>

                    {!!state.errorMessage && <span className="errors_small">{state.errorMessage}</span>}

                    <Button
                        disabled={
                            isSubmitting ||
                            (
                                errors.address ||
                                errors.city ||
                                errors.country ||
                                errors.phone ||
                                errors.email ||
                                errors.fullName
                            )
                        }
                        type="submit"
                        className="btn"
                    >
                        {isSubmitting ? "Loading..." : "Save"}
                    </Button>

                </form>
            )
            }
        </Formik>
    )
}
