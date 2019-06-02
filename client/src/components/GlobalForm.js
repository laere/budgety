import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import InputField from "components/InputField";

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

GlobalForm.propTypes = {
  initialValues: PropTypes.object,
  cancelpath: PropTypes.string,
  validateFunc: PropTypes.func,
  actionCreator: PropTypes.func,
  formFields: PropTypes.array
};

export default GlobalForm;
