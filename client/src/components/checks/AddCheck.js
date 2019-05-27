import React from "react";
import InputField from "components/InputField";
import { connect } from "react-redux";
import { addCheck } from "actions/checks/checkActions";
import GlobalForm from "components/GlobalForm";
import formFields from "components/checks/formFields";
import checkValidation from "validation/checkValidation";

class AddCheck extends React.Component {
  render() {
    //   return (
    //     <div>
    //       <h1 className="title is-3">Add a check to your balance!</h1>
    //       <Formik
    //         initialValues={{ checkamount: "" }}
    //         onSubmit={(values, { setSubmitting }) => {
    //           setSubmitting(false);
    //           // console.log("VALUES", values);
    //           this.props.addCheck(this.props.match.params.budgetId, values);
    //         }}
    //       >
    //         {({ isSubmitting, values }) => (
    //           <Form>
    //             <InputField type="number" name="checkamount" label="Check:" />
    //             <button
    //               type="submit"
    //               className="button is-primary is-large"
    //               style={{ marginTop: "20px" }}
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
    return (
      <React.Fragment>
        <GlobalForm
          formFields={formFields}
          validateFunc={checkValidation}
          initialValues={{ checkamount: "" }}
          actionCreator={this.props.addCheck}
          cancelpath="/budgets"
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { addCheck }
)(AddCheck);
