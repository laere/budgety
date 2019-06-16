import React from "react";
import accounting from "accounting-js";
import { Field } from "formik";
import { connect } from "react-redux";
import { updateCategoryItem } from "actions/categories/categoryActions";
import onClickEditHOC from "components/onClickEditHOC";

class CategorySubItem extends React.Component {
  render() {
    // console.log(this.props);
    const {
      defaultValue,
      isEditing,
      type,
      fieldName,
      handleCategoryItemEditSubmit,
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
            onBlur={() => handleCategoryItemEditSubmit(values)}
            autoFocus
          />
        ) : (
          <span onClick={handleEditing}>{ifNumFormatToMoney}</span>
        )}
      </div>
    );
  }
}

CategorySubItem.defaultProps = {
  type: "text"
};

const WrappedComponent = onClickEditHOC(CategorySubItem);

export default connect(
  null,
  { updateCategoryItem }
)(WrappedComponent);
