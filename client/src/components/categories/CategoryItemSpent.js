import React from "react";
import onClickEditHOC from "components/onClickEditHOC";

class CategoryItemSpent extends React.Component {
  render() {
    return <div />;
  }
}

const WrappedComponent = onClickEditHOC(CategoryItemSpent);

export default CategoryItemSpent;
