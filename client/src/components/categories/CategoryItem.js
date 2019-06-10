import React from "react";
import PropTypes from "prop-types";

class CategoryItem extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>Item Amount</td>
        <td>
          <button>Delete</button>
        </td>
      </tr>
    );
  }
}

CategoryItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default CategoryItem;
