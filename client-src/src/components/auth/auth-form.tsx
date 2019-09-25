import React, {FC} from 'react';
import {TextInput} from "../form";
import {Form, FormikProps} from "formik";
import {AuthValidatorValues} from "./validator";

export type AuthBaseFormProps = FormikProps<AuthValidatorValues>;
const AuthBaseForm: FC<AuthBaseFormProps> = (props) => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleReset,
    isSubmitting
  } = props;

  return (
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
              style={{marginTop: '20px'}}
              disabled={isSubmitting}>
        Submit
      </button>
      <button
        type="button"
        className="m-l-15 outline"
        onClick={handleReset}
        style={{marginTop: '20px'}}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
    </Form>
  );
};

export const AuthForm = AuthBaseForm;
