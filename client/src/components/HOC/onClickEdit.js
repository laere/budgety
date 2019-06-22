import React from "react";

const onClickEdit = WrappedComponent => {
  return class onClickEdit extends React.Component {
    state = {
      isEditing: false
    };

    handleEditing = () => {
      this.setState({ isEditing: true });
    };

    handleCategoryEditSubmit = values => {
      const { updateCategory, budgetId, categoryId } = this.props;

      updateCategory(budgetId, categoryId, values);
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
      // console.log("HOC", this.props);
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

export default onClickEdit;
