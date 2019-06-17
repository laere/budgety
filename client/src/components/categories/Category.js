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
    showcategory: false
  };

  toggleCategory = () => {
    const { showcategory } = this.state;

    this.setState({ showcategory: !showcategory });
  };

  handleDelete = () => {
    const { deleteCategory, budgetId, category } = this.props;

    deleteCategory(budgetId, category._id);
  };

  render() {
    console.log("CATEGORY PROPS", this.props);
    // console.log("CATEGORY STATE", this.state);
    const { showcategory } = this.state;
    const { budgetId, category } = this.props;
    const { name, planned, totalspent, _id } = this.props.category;

    const icon = showcategory ? "fas fa-angle-up" : "fas fa-angle-down";
    // console.log("NAME", name);
    return (
      <div className="category">
        <header className="category-header">
          <div className="category-header__name">
            <Formik initialValues={{ name, planned }}>
              {({ values }) => (
                <Form>
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

            <span
              className={`category-header__icon ${icon}`}
              style={{ marginLeft: "20px" }}
              onClick={this.toggleCategory}
            />
          </div>
          <div className="category-header__end">
            <div className="category-header__end--item">
              Spent: {accounting.formatMoney(totalspent)}
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
