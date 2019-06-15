import React from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { updateCategoryItem } from "actions/categories/categoryActions";
import onClickEditHOC from "components/onClickEditHOC";

class CategoryItemName extends React.Component {
  render() {
    console.log(this.props);

    return (
      <div>
        {this.props.isEditing ? (
          <Field
            type="text"
            name={this.props.fieldName}
            className="input"
            onBlur={() =>
              this.props.handleCategoryItemEditSubmit(this.props.values)
            }
            autoFocus
          />
        ) : (
          <span onClick={this.props.handleEditing}>
            {this.props.defaultValue}
          </span>
        )}
      </div>
    );
  }
}

const WrappedComponent = onClickEditHOC(CategoryItemName);

export default connect(
  null,
  { updateCategoryItem }
)(WrappedComponent);
