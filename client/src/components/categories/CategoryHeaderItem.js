import React from "react";
import accounting from "accounting-js";
import { Field } from "formik";
import { connect } from "react-redux";
import { updateCategory } from "actions/categories/categoryActions";
import onClickEdit from "components/onClickEdit";

class CategoryHeaderItem extends React.Component {
  render() {
    console.log("CATEGORY HEADER ITEM", this.props);
    const {
      defaultValue,
      isEditing,
      type,
      fieldName,
      handleCategoryEditSubmit,
      values,
      handleEditing
    } = this.props;

    // If the value is a number we must be editing the spent field
    // Thus use accounting JS format money method, else must be the name field we're editing
    const ifNumFormatToMoney =
      typeof defaultValue != "number"
        ? defaultValue
        : accounting.formatMoney(defaultValue);

    return (
      <div>
        {isEditing ? (
          <Field
            type={type}
            name={fieldName}
            className="input"
            onBlur={() => handleCategoryEditSubmit(values)}
            autoFocus
          />
        ) : (
          <span onClick={handleEditing}>{ifNumFormatToMoney}</span>
        )}
      </div>
    );
  }
}

CategoryHeaderItem.defaultProps = {
  type: "text"
};

const EnhancedComponent = onClickEdit(CategoryHeaderItem);

export default connect(
  null,
  { updateCategory }
)(EnhancedComponent);
