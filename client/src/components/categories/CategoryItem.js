import React from "react";
import accounting from "accounting-js";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { deleteCategoryItem } from "actions/categories/categoryActions";
import onClickEditHOC from "components/onClickEditHOC";
import CategorySubItem from "components/categories/CategorySubItem";

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
          <Formik initialValues={{ name, spent }}>
            {({ values }) => (
              <Form>
                <CategorySubItem
                  fieldName="name"
                  defaultValue={name}
                  categoryItemId={_id}
                  budgetId={budgetId}
                  categoryId={categoryId}
                  values={values}
                />
                <CategorySubItem
                  fieldName="spent"
                  defaultValue={spent}
                  categoryItemId={_id}
                  budgetId={budgetId}
                  categoryId={categoryId}
                  values={values}
                  type="number"
                />
              </Form>
            )}
          </Formik>
        </div>
        <div className="category-item__end">
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

export default connect(
  null,
  { deleteCategoryItem }
)(CategoryItem);
