import React, {FC, useContext, useMemo} from "react";
import {AuthContext, createUser, loginUser} from "../core/auth";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {parse as queryParse} from "query-string";
import {AuthSchemaType, AuthValidatorSchema, initialAuthValues} from "../components/auth/validator";
import {Formik, Form, FormikHelpers} from "formik";
import {TextInput} from "../components/form";

const Login: FC<RouteComponentProps> = ({location}) => {
    const {user, changeUser} = useContext(AuthContext);

    const isRegisterPage = useMemo(() => {
        const queryProps = queryParse(location!.search);
        return (queryProps && queryProps["register"] !== undefined);
    }, [location]);

    const formikInitialValues = useMemo(() => {
        return {
            ...initialAuthValues,
            register: isRegisterPage
        }
    }, [isRegisterPage])

    const onSubmit = (payload: AuthSchemaType, {setSubmitting, setErrors}: FormikHelpers<AuthSchemaType>) => {
        const submitFunction =
            isRegisterPage
                ? createUser(payload.email, payload.password, ["user"])
                : loginUser(payload.email, payload.password);

        submitFunction
            .then(user => {
                setSubmitting(false);
                console.log("Logged in");
                changeUser(user);
            })
            .catch(({code, message}) => {
                console.error(code, message);
                setSubmitting(false);
                setErrors({message});
            });
    }

    if (user) return <Redirect to="/"/>;

    return (
        <Formik initialValues={formikInitialValues} validationSchema={AuthValidatorSchema} onSubmit={onSubmit}>
            {({
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  values,
                  handleReset,
                  dirty,
                  isSubmitting
              }) => (
                <Form className="full-width">
                    <TextInput
                        id="email"
                        type="text"
                        label="Email"
                        placeholder="Email Here"
                        error={touched.email && errors.email}
                        value={values.email || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextInput
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="Password Here"
                        error={touched.password && errors.password}
                        value={values.password || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {
                        values.register &&
                        <TextInput
                            id="passwordconfirm"
                            type="password"
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            error={touched.passwordconfirm && errors.passwordconfirm}
                            value={values.passwordconfirm || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    }

                    {errors.message && <p className="error">{errors.message}</p>}

                    <button type="submit"
                            disabled={isSubmitting}>
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                    >
                        Reset
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default withRouter(Login);
