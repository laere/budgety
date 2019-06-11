import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import {
  deleteCategoryItem,
  updateCategoryItem
} from "actions/categories/categoryActions";

class CategoryItem extends React.Component {
  state = { isEditing: false };

  handleEditing = () => {
    this.setState({ isEditing: true });
  };

  handleEditSubmit = values => {
    const { updateCategoryItem, budgetId, categoryId } = this.props;
    const { _id } = this.props.item;
    console.log(this.props);
    updateCategoryItem(budgetId, categoryId, _id, values);
    this.setState({ isEditing: false });
  };

  render() {
    const { budgetId, categoryId } = this.props;
    const { name, _id } = this.props.item;
    const { isEditing } = this.state;
    return (
      <tr>
        <td>
          {isEditing ? (
            <Formik initialValues={{ name: name }}>
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
        </td>
        <td>Item Amount</td>
        <td>
          <button
            className="button is-small is-danger is-outlined"
            onClick={() =>
              this.props.deleteCategoryItem(budgetId, categoryId, _id)
            }
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

CategoryItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteCategoryItem, updateCategoryItem }
)(CategoryItem);
