import * as Yup from "yup";
import {StringSchema} from "yup";

export const initialAuthValues = {
    email: '',
    password: '',
    passwordconfirm: '',
    register: false,
    message: ''
}

export type AuthSchemaType = typeof initialAuthValues;

export const AuthValidatorSchema = Yup.object().shape({
    email: Yup.string()
        .email("Must be a valid email address")
        .required("Email is required."),
    password: Yup.string().when("register", (reg: string, schema: StringSchema) => {
        if (!!reg) {
            return schema.password();
        }
        return schema;
    })
        .required("Password is required."),
    passwordconfirm: Yup.string().when("register", (reg: string, schema: StringSchema) => {
        if (!!reg) {
            return schema
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Password confirm is required");
        }
        return schema;
    }),
    register: Yup.boolean()
} as Record<keyof AuthSchemaType, any>);
