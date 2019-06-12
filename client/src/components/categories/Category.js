import React from "react";
import CategoryList from "components/categories/CategoryList";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import InputField from "components/InputField";
import { connect } from "react-redux";
import {
  deleteCategory,
  updateCategory
} from "actions/categories/categoryActions";

class Category extends React.Component {
  state = {
    isEditing: false,
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

  handleEditing = () => {
    this.setState({ isEditing: true });
  };

  handleEditSubmit = values => {
    const { updateCategory, budgetId, category } = this.props;
    updateCategory(budgetId, category._id, values);
    this.setState({ isEditing: false });
  };

  render() {
    // console.log("CATEGORY STATE", this.state);
    const { showcategory, isEditing } = this.state;
    const { name, _id } = this.props.category;
    const icon = showcategory ? "fas fa-angle-up" : "fas fa-angle-down";
    // console.log("NAME", name);
    return (
      <div className="category">
        <header className="category-header">
          <div className="category-header__name">
            {isEditing ? (
              <Formik initialValues={{ name: this.props.category.name }}>
                {({ values }) => (
                  <Form>
                    <Field
                      type="text"
                      name="name"
                      className="input"
                      onBlur={() => this.handleEditSubmit(values)}
                      autoFocus
                    />
                  </Form>
                )}
              </Formik>
            ) : (
              <span onClick={this.handleEditing}>{name}</span>
            )}
            <span
              className={`category-header__icon ${icon}`}
              style={{ marginLeft: "20px" }}
              onClick={this.toggleCategory}
            />
          </div>
          <div className="category-header__end">
            <div className="item">Planned</div>
            <div className="item">Remaining</div>
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
