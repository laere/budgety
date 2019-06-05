import React from "react";

class CategoryItem extends React.Component {
  state = { isSelected: false };

  handleSelectedItem = e => {
    const { isSelected } = this.state;

    this.setState({ isSelected: !isSelected });
  };

  render() {
    console.log("CATEGORY ITEM PROPS", this.props);
    const { isSelected } = this.state;
    return (
      <tr
        onClick={this.handleSelectedItem}
        className={isSelected ? "is-selected" : ""}
      >
        <td>{this.props.item.name}</td>
        <td>Item Amount</td>
      </tr>
    );
  }
}

export default CategoryItem;
