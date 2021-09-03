import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { generatePath, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "src/components/Form/TextInput/TextInput";
import { Button } from "src/components/Form/Button/Button";
import { Select } from "src/components/Form/Select/Select";
import { addOrder, getLocations, setCart, setOrdered } from "src/store/actions";
import { CartSchema } from "./CartSchema";
import { cartSelector } from "src/store/selectors";
import "./CartForm.css";
import { removeCart } from "src/utils/common";

export const CartForm = ({ user, items, price }) => {
    const dispatch = useDispatch();
    const [locations, setLocations] = useState([]);
    const { fullName, phone, country, city, address } = user;
    const isDisabled = (price === 0 && items === 0) ? true : false;

    const initLocations = async () => {
        const locationRequest = await dispatch(getLocations());
        setLocations(locationRequest.data);
    }

    useEffect(() => {
        initLocations();
    }, [])

    const [state, setState] = useState({
        errorMessage: null,
    });

    const initialValues = {
        fullName: fullName || "",
        phone: phone || "",
        country: country || "",
        city: city || "",
        address: address || ""
    }

    const history = useHistory();
    const products = useSelector(cartSelector);

    const continueShoppingHandler = () => {
        history.push(generatePath("/"));
    }

    const onSubmit = async (values, resetForm) => {
        const items = [];
        const { fullName, phone, country, city, address } = values;

        products.map((item) => {
            items.push({ productId: item.product.id, quantity: item.qtty })
        });

        const orderData = {
            items: items,
            shipment: {
                fullName,
                phone,
                country,
                city,
                address
            },
        }
        try {
            const order = await dispatch(addOrder(orderData));
            dispatch(setCart([]));
            removeCart();
            dispatch(setOrdered(order.data));
        } catch (err) {
            if (err.response.status === 401) {
                setState({
                    errorMessage:
                        "Whoops, something went wrong, user unauthorized",
                });
            } else {
                setState({
                    errorMessage: "Something goes wrong! Please try again.",
                });
            }
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={CartSchema}
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
            }) => (
                <form className="cart-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <TextInput
                            disabled={isDisabled}
                            type="text"
                            name="fullName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fullName}
                            placeholder={values.fullName}
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
                            disabled={isDisabled}
                            type="text"
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            placeholder={phone}
                            className={(errors.phone && touched.phone) ? "errors_outline" : ""}
                        />
                        {errors.phone && touched.phone ? (
                            <span className="errors_small">
                                {errors.phone && touched.phone && errors.phone}
                            </span>
                        ) : null}
                    </div>
                    {
                        locations && (
                            <div className="form-row">
                                <Select
                                    disabled={isDisabled}
                                    name="country"
                                    value={country}
                                    onChange={handleChange}
                                >
                                    {locations.map((location) => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </Select>
                            </div>
                        )
                    }
                    <div className="form-row">
                        <TextInput
                            disabled={isDisabled}
                            type="text"
                            name="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            placeholder={city}
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
                            disabled={isDisabled}
                            type="text"
                            name="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            placeholder={address}
                            className={(errors.address && touched.address) ? "errors_outline" : ""}
                        />
                        {errors.address && touched.address ? (
                            <span className="errors_small">
                                {errors.address && touched.address && errors.address}
                            </span>
                        ) : null}
                    </div>

                    {!!state.errorMessage && <span className="errors_small">{state.errorMessage}</span>}

                    <table className="cart-total-table">
                        <tbody>
                            <tr>
                                <th>Items:</th>
                                <td>{items}</td>
                            </tr>
                            <tr>
                                <th>Total:</th>
                                <td>$ {price}</td>
                            </tr>
                        </tbody>
                    </table>

                    <Button
                        disabled={isSubmitting || isDisabled}
                        type="submit"
                        className="purchase_btn"
                    >
                        {isSubmitting ? "Loading..." : "Confirms the purchase"}
                    </Button>
                    <Button
                        type="outline"
                        className="continue_btn"
                        onClick={continueShoppingHandler}
                    >
                        Continue shopping
                    </Button>
                </form>
            )
            }
        </Formik>
    )
}