import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCategoryItem } from "actions/categories/categoryActions";

class CategoryItem extends React.Component {
  render() {
    const { budgetId, categoryId } = this.props;
    const { name, _id } = this.props.item;
    return (
      <tr>
        <td>{name}</td>
        <td>Item Amount</td>
        <td>
          <button
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
  { deleteCategoryItem }
)(CategoryItem);
