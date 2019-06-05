import React from "react";

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
        <td>Category Item</td>
        <td>Item Amount</td>
      </tr>
    );
  }
}

export default CategoryItem;
