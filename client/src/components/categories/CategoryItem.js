import React from "react";
import PropTypes from "prop-types";

class CategoryItem extends React.Component {
  state = { isSelected: false };

  handleSelectedItem = e => {
    const { isSelected } = this.state;

    this.setState({ isSelected: !isSelected });
  };

  render() {
    const { isSelected } = this.state;
    return (
      <tr
        onClick={this.handleSelectedItem}
        className={isSelected ? "is-selected" : ""}
      >
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
  isSelected: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
};

export default CategoryItem;
