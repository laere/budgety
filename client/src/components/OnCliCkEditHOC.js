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

    handleEditSubmit = values => {
      this.props.updateCategory(
        this.props.budgetId,
        this.props.category._id,
        values
      );
      this.setState({ isEditing: false });
    };

    render() {
      console.log("HOC", this.props);
      return (
        <WrappedComponent
          isEditing={this.state.isEditing}
          handleEditing={this.handleEditing}
          handleEditSubmit={this.handleEditSubmit}
          {...this.props}
        />
      );
    }
  };
};

export default onClickEditHOC;
