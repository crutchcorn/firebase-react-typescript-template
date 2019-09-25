import React, {FC, useContext, useMemo} from "react";
import {AuthContext, createUser, loginUser} from "../core/auth";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import {parse as queryParse} from "query-string";
import {AuthForm as AuthBaseForm} from "../components/auth/auth-form";
import {authValidator, AuthValidatorProps} from "../components/auth/validator";
import {AuthValidatorSubmitType} from "../components/auth/validator";

const Login: FC<RouteComponentProps> = ({location}) => {
    const {user, changeUser} = useContext(AuthContext);

    const isRegisterPage = useMemo(() => {
        const queryProps = queryParse(location!.search);
        return (queryProps && queryProps["register"] !== undefined);
    }, [location]);

    const AuthForm: FC<AuthValidatorProps & { className: string }> = useMemo(
        () =>
            authValidator(((payload, {setSubmitting, setErrors}) => {
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
            }) as AuthValidatorSubmitType)(AuthBaseForm) as any,
        [isRegisterPage, changeUser]
    );

    if (user) return <Redirect to="/"/>;

    if (!AuthForm) return null;

    return (
        <AuthForm
            className="full-width"
            user={{
                password: "",
                passwordconfirm: "",
                email: ""
            }}
            register={isRegisterPage}
        />
    );
};

export default withRouter(Login);
