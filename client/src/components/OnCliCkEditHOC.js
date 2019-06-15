import React from "react";

const onClickEditHOC = WrappedComponent => {
  return class extends React.Component {
    state = {
      isEditing: false
    };

    handleEditing = () => {
      this.setState({ isEditing: true });
      console.log("asdas");
    };

    handleCategoryEditSubmit = values => {
      this.props.updateCategory(
        this.props.budgetId,
        this.props.category._id,
        values
      );
      this.setState({ isEditing: false });
    };

    handleCategoryItemEditSubmit = values => {
      const {
        updateCategoryItem,
        budgetId,
        categoryId,
        categoryItemId
      } = this.props;

      updateCategoryItem(budgetId, categoryId, categoryItemId, values);
      this.setState({ isEditing: false });
    };

    render() {
      console.log("HOC", this.props);
      return (
        <WrappedComponent
          isEditing={this.state.isEditing}
          handleEditing={this.handleEditing}
          handleCategoryEditSubmit={this.handleCategoryEditSubmit}
          handleCategoryItemEditSubmit={this.handleCategoryItemEditSubmit}
          {...this.props}
        />
      );
    }
  };
};

export default onClickEditHOC;
