import React from "react";
import CategoryList from "components/categories/CategoryList";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import InputField from "components/InputField";
import { connect } from "react-redux";
import {
  deleteCategory,
  editCategory
} from "actions/categories/categoryActions";

class Category extends React.Component {
  state = { showcategory: false };

  toggleCategory = () => {
    const { showcategory } = this.state;

    this.setState({ showcategory: !showcategory });
  };

  handleDelete = () => {
    const { deleteCategory, budgetId, category } = this.props;

    deleteCategory(budgetId, category._id);
  };

  render() {
    const { showcategory, isEditing } = this.state;
    const { name, _id } = this.props.category;
    const icon = showcategory ? "fas fa-angle-up" : "fas fa-angle-down";

    return (
      <div style={{ marginTop: "30px" }}>
        <div className="card">
          <header className="card-header">
            <div className="card-header-title" onClick={this.handleEditing}>
              {name}
            </div>
            <Link
              to={`/budgets/${this.props.budgetId}/categories/${_id}`}
              className="button is-small"
            >
              Edit
            </Link>
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
  category: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteCategory, editCategory }
)(Category);
