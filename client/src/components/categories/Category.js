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
      <div style={{ marginTop: "30px" }}>
        <div className="card">
          <header className="card-header">
            <div className="card-header-title">
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
            </div>
            <button onClick={this.handleDelete} className="button is-small">
              Delete
            </button>
            <p
              className={`card-header-icon ${icon}`}
              onClick={this.toggleCategory}
            />
          </header>
          <div>{showcategory ? <CategoryList categoryId={_id} /> : false}</div>
        </div>
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
