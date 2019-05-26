import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { addTransaction } from "actions";
import formFields from "components/transactions/formFields";
import GlobalForm from "components/GlobalForm";

class TransactionNew extends React.Component {
  // renderFields() {
  //   return formFields.map(({ label, name, type, style }) => {
  //     return <InputField label={label} name={name} type={type} style={style} />;
  //   });
  // }
  //
  // render() {
  //   const { budgetId } = this.props.match.params;
  //   return (
  //     <div>
  //       <Formik
  //         onSubmit={(values, { setSubmitting }) => {
  //           setSubmitting(false);
  //           // console.log("VALUES", values);
  //           this.props.addTransaction(budgetId, values);
  //         }}
  //       >
  //         {({ isSubmitting, values }) => (
  //           <Form>
  //             {this.renderFields()}
  //             <Link
  //               to={`/budgets/${budgetId}`}
  //               className="button is-danger is-large"
  //             >
  //               Cancel
  //             </Link>
  //             <button
  //               type="submit"
  //               className="button is-primary is-large"
  //               disabled={isSubmitting}
  //               onSubmit={this.onSubmit}
  //             >
  //               Submit
  //             </button>
  //           </Form>
  //         )}
  //       </Formik>
  //     </div>
  //   );
  // }

  handleCallback = values => {
    const { budgetId } = this.props.match.params;
    this.props.addTransaction(budgetId, values);
  };

  render() {
    const { budgetId } = this.props.match.params;
    return (
      <React.Fragment>
        <GlobalForm
          formFields={formFields}
          actionCreator={this.handleCallback}
          initialValues={{ description: "", amount: "" }}
          cancelpath={`/budgets/${budgetId}`}
          id={budgetId}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { addTransaction }
)(TransactionNew);
