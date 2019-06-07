import React from "react";
import { connect } from "react-redux";
import { editCategory } from "actions/categories/categoryActions";
import formFields from "components/categories/formFields";
import GlobalForm from "components/GlobalForm";
import Spinner from "components/Spinner";
import PropTypes from "prop-types";

class CategoryEdit extends React.Component {
  handleActionCreator = values => {
    const { budgetId, categoryId } = this.props.match.params;
    this.props.editCategory(budgetId, categoryId, values);
  };

  findCategory() {
    console.log(this.props.budget);
    return this.props.budget.categories.find(
      category => category._id === this.props.match.params.categoryId
    );
  }

  render() {
    const category = this.findCategory();
    console.log(this.props.budget);
    return (
      <React.Fragment>
        <GlobalForm
          initialValues={{ name: category.name }}
          formFields={formFields}
          actionCreator={this.handleActionCreator}
          cancelpath={`/budgets/${this.props.match.params.budgetId}`}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ budgets }) => {
  return { budget: budgets.budget, loading: budgets.loading };
};

CategoryEdit.propTypes = {
  editCategory: PropTypes.func.isRequired,
  budget: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { editCategory }
)(CategoryEdit);
