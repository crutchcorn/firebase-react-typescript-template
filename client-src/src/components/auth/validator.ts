import {withFormik, WithFormikConfig} from "formik";
import * as Yup from "yup";
import {MixedSchema, StringSchema} from "yup";

export interface AuthValidatorValues {
    email: string;
    password: string;
    passwordconfirm: string;
    register: boolean;
    message: string;
}

export interface AuthValidatorProps {
    user: {
        email: string;
        password: string;
        passwordconfirm: string;
    };
    register: boolean;
}

export type AuthValidatorSubmitType = WithFormikConfig<AuthValidatorProps, AuthValidatorValues>['handleSubmit'];

export const authValidator = (handleSubmit: AuthValidatorSubmitType) =>
    withFormik({
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Must be a valid email address")
                .required("Email is required."),
            password: Yup.string()
                .when("register", (reg: string, schema: StringSchema) => {
                    if (!!reg) {
                        return schema
                            .matches(/.{8,}/, {
                                excludeEmptyString: true,
                                message: "Password must have at least eight characters"
                            })
                            .matches(/[a-z]/, {
                                excludeEmptyString: true,
                                message: "Password must have a lowercase character"
                            })
                            .matches(/[A-Z]/, {
                                excludeEmptyString: true,
                                message: "Password must have an uppercase character"
                            })
                            .matches(/\d/, {
                                excludeEmptyString: true,
                                message: "Password must have a numerical character"
                            })
                            .matches(/[@$!%*?&]/, {
                                excludeEmptyString: true,
                                message: "Password must have a special character"
                            });
                    }
                    return schema;
                })
                .required("Password is required."),
            passwordconfirm: Yup.string().when("register", (reg: string, schema: MixedSchema) => {
                if (!!reg) {
                    return schema
                        .oneOf([Yup.ref("password"), null], "Passwords must match")
                        .required("Password confirm is required");
                }
                return schema;
            }),
            register: Yup.boolean()
        }),
        mapPropsToValues: ({user, register}) => ({
            ...user,
            register
        } as AuthValidatorValues),
        handleSubmit
    });
