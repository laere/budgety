import React from "react";
import accounting from "accounting-js";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import {
  deleteCategoryItem,
  updateCategoryItem
} from "actions/categories/categoryActions";
import onClickEditHOC from "components/onClickEditHOC";
import CategoryItemName from "components/categories/CategoryItemName";

class CategoryItem extends React.Component {
  render() {
    const { name, spent, _id } = this.props.item;
    const {
      budgetId,
      categoryId,
      isEditing,
      handleEditing,
      handleCategoryEditSubmit,
      handleCategoryItemEditSubmit
    } = this.props;

    console.log("ITEM", this.props);

    return (
      <div className="category-item">
        <div>
          <CategoryItemName
            initialValues={{ name: this.props.item.name }}
            fieldName="name"
            defaultValue={name}
            categoryItemId={_id}
            budgetId={budgetId}
            categoryId={categoryId}
          />
        </div>
        <div className="category-item__end">
          <CategoryItemName
            initialValues={{ spent: this.props.item.spent }}
            fieldName="spent"
            defaultValue={accounting.formatMoney(spent)}
            categoryItemId={_id}
            budgetId={budgetId}
            categoryId={categoryId}
          />
          <div>
            <i
              className="far fa-trash-alt category-item-delete-icon"
              onClick={() =>
                this.props.deleteCategoryItem(budgetId, categoryId, _id)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

CategoryItem.propTypes = {
  item: PropTypes.object.isRequired
};

// const WrappedComponent = onClickEditHOC(CategoryItem);

export default connect(
  null,
  { deleteCategoryItem, updateCategoryItem }
)(CategoryItem);
