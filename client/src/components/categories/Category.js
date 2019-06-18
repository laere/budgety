import React from "react";
import CategoryList from "components/categories/CategoryList";
import PropTypes from "prop-types";
import accounting from "accounting-js";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import {
  deleteCategory,
  updateCategory
} from "actions/categories/categoryActions";
import CategoryHeaderItem from "components/categories/CategoryHeaderItem";

class Category extends React.Component {
  state = {
    showcategory: false,
    shoeRemaining: false
  };

  toggleCategory = () => {
    const { showcategory } = this.state;

    this.setState({ showcategory: !showcategory });
  };

  toggleRemaining = () => {
    const { showRemaining } = this.state;

    this.setState({ showRemaining: !showRemaining });
  };

  handleDelete = () => {
    const { deleteCategory, budgetId, category } = this.props;

    deleteCategory(budgetId, category._id);
  };

  render() {
    const { showcategory, showRemaining } = this.state;
    const { budgetId, category } = this.props;
    const { name, planned, totalspent, _id } = this.props.category;

    const icon = showcategory ? "fas fa-angle-up" : "fas fa-angle-down";

    const remaining = planned - totalspent;

    return (
      <div className="category">
        <header className="category-header">
          <div className="category-header__name">
            <span
              className={`category-header__icon ${icon}`}
              onClick={this.toggleCategory}
            />
            <Formik initialValues={{ name, planned }}>
              {({ values }) => (
                <Form className="category-header-form">
                  <CategoryHeaderItem
                    fieldName="name"
                    defaultValue={name}
                    categoryItemId={_id}
                    budgetId={budgetId}
                    categoryId={category._id}
                    values={values}
                  />

                  <CategoryHeaderItem
                    fieldName="planned"
                    label="Planned"
                    defaultValue={planned}
                    categoryItemId={_id}
                    budgetId={budgetId}
                    categoryId={category._id}
                    values={values}
                    type="number"
                  />
                </Form>
              )}
            </Formik>
          </div>
          <div className="category-header__end">
            <div className="category-header__end--item">
              {showRemaining ? (
                <span style={{ color: `${remaining < 0 ? "red" : "green"}` }}>
                  Remaining: {accounting.formatMoney(remaining)}
                </span>
              ) : (
                <span style={{ color: "#1EA3B2" }}>
                  Spent: {accounting.formatMoney(totalspent)}
                </span>
              )}
              <span
                className={icon}
                onClick={this.toggleRemaining}
                style={{ marginLeft: "10px" }}
              />
            </div>

            <div>
              <button
                className="button is-danger is-outlined is-small"
                onClick={this.handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </header>

        {showcategory ? <CategoryList categoryId={_id} /> : false}
      </div>
    );
  }
}

Category.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteCategory, updateCategory }
)(Category);
