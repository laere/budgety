import React from "react";
import { Formik, Form } from "formik";
import InputField from "components/InputField";
import { Link } from "react-router-dom";

const GlobalForm = props => {
  const renderFields = () => {
    return props.formFields.map(({ label, name, type, classStyleName, id }) => {
      return (
        <InputField
          name={name}
          type={type}
          label={label}
          classStyleName={classStyleName}
          key={id}
        />
      );
    });
  };

  return (
    <div className="form">
      <Formik
        initialValues={props.initialValues}
        validate={values => props.validateFunc(values)}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          props.actionCreator(values);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            {renderFields()}
            <Link
              to={props.cancelpath}
              type="submit"
              className="button is-danger is-large"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="button is-primary is-large"
              disabled={isSubmitting}
              onSubmit={props.onSubmit}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GlobalForm;
