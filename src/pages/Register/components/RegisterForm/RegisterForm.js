import React, { useState } from 'react';
import { Formik } from 'formik';
import { TextInput } from 'src/components/Form/TextInput/TextInput';
import { PasswordInput } from 'src/components/Form/PasswordInput/PasswordInput';
import { Button } from 'src/components/Form/Button/Button';
import { useDispatch } from 'react-redux';
import { register } from 'src/store/actions';
import { RegisterSchema } from "./RegisterSchema";
import { generatePath, useHistory } from 'react-router-dom';
import './RegisterForm.css';

export const RegisterForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    error: false,
    emailError: null,
    commonError: null,
  });

  const initialValues = {
    email: '',
    fullName: '',
    phone: '',
    password: '',
  }

  const onSubmit = async (values, resetForm) => {
    const { fullName, email, password, phone } = values;

    try {
      await dispatch(register({ fullName, email, password, phone }));
      history.push(generatePath("/"));
    } catch (err) {
      if (err.response.status === 409) {
        setState(prev => ({
          ...prev,
          error: true,
          emailError:
            "This email already exist! Please try an other password.",
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: true,
          commonError: "Something goes wrong! Please try again.",
        }));
      }
    }
  }

  return (
    <div className="form-wrapper">
      <h3 className="modal-title">Register</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
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
          <form onSubmit={handleSubmit} className="register_form">
            <div className="form_row">
              <TextInput
                name="fullName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
                placeholder="Full name"
                className={errors.fullName && touched.fullName ? "errors_outline" : ""}
              />
              {errors.fullName && touched.fullName ? (
                <span className="errors_small">
                  {errors.fullName &&
                    touched.fullName &&
                    errors.fullName}
                </span>
              ) : null}
            </div>
            <div className="form_row">
              <TextInput
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
                className={(errors.email && touched.email) || state.error ? "errors_outline" : ""}
              />
              {errors.email && touched.email ? (
                <span className="errors_small">
                  {errors.email && touched.email && errors.email}
                </span>
              ) : null}

              {state.error ? (
                <span className="errors_small">
                  {state.emailError}
                </span>
              ) : null}
            </div>

            <div className="form_row">
              <TextInput
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                placeholder="Phone number"
                className={(errors.phone && touched.phone) ? "errors_outline" : ""}
              />
              {errors.phone && touched.phone ? (
                <span className="errors_small">
                  {errors.phone &&
                    touched.phone &&
                    errors.phone}
                </span>
              ) : null}
            </div>
            <div className="form_row">
              <PasswordInput
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                className={(errors.password && touched.password) ? "errors_outline" : ""}
              />
              {errors.password && touched.password ? (
                <span className="errors_small">
                  {errors.password &&
                    touched.password &&
                    errors.password}
                </span>
              ) : null}
              <small className="password_note">
                The password has to be at least at least 1 letter, 1special symbol, 1 number
              </small>
            </div>

            {state.error ? (
              <span className="errors_small">
                {state.commonError}
              </span>
            ) : null}
            <div className="form_row">
              <Button
                disabled={isSubmitting}
                className="register_btn"
              >
                Register
            </Button>
            </div>
          </form>
        )}
      </Formik>
    </div >
  );
};
