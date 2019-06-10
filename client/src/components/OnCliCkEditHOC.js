import React from "react";

function onClickEditHOC(WrappedComponent) {
  return class extends React.Component {
    state = {
      isEditing: false,
      showcategory: false
    };

    toggleCategory = () => {
      const { showcategory } = this.state;

      this.setState({ showcategory: !showcategory });
    };

    handleEditing = () => {
      this.setState({ isEditing: true });
    };

    handleEditSubmit = values => {
      const { updateCategory, budgetId, category } = this.props;
      updateCategory(budgetId, category._id, values);
      this.setState({ isEditing: false });
    };
  };
}
