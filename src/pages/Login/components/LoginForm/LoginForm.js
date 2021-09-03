import React, { useState } from "react";

import { Formik } from "formik";
import { generatePath, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TextInput } from "src/components/Form/TextInput/TextInput";
import { PasswordInput } from "src/components/Form/PasswordInput/PasswordInput";
import { Button } from "src/components/Form/Button/Button";
import { LoginSchema } from "./LoginSchema";
import { login } from "src/store/actions";
import "./LoginForm.css";

export const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    errorMessage: null,
  });

  const initialValues = {
    email: "",
    password: "",
  }

  const onSubmit = async (values, resetForm) => {
    const { email, password } = values;

    try {
      await dispatch(login({ email, password }));
      history.push(generatePath("/"));
    } catch (err) {
      if (err.response.status === 409) {
        setState({
          errorMessage:
            "Wrong login or password! Please try again!",
        });
      } else {
        setState({
          errorMessage: "Something goes wrong! Please try again.",
        });
      }
    }
  }

  return (
    <div className="form-wrapper">
      <h3 className="modal-title">Login</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
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
          <form className="login_form" onSubmit={handleSubmit}>
            <div className="form_row">
              <TextInput
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Example@gmail.com"
                className={(errors.email && touched.email) || state.error ? "errors_outline" : ""}
              />
              {errors.email && touched.email ? (
                <span className="errors_small">
                  {errors.email && touched.email && errors.email}
                </span>
              ) : null}
            </div>
            <div className="form_row">
              <PasswordInput
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                className={(errors.password && touched.password) || state.error ? "errors_outline" : ""}
              />
              {errors.password && touched.password ? (
                <span className="errors_small">
                  {errors.password &&
                    touched.password &&
                    errors.password}
                </span>
              ) : null}
            </div>

            {!!state.errorMessage && <span className="errors_small">{state.errorMessage}</span>}

            <Button
              disabled={isSubmitting}
              type="submit"
              className="login_btn"
            >
              {isSubmitting ? "Loading..." : "Login"}
            </Button>

          </form>
        )
        }
      </Formik>
    </div>

  );
};
