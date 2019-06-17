import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { deleteCategoryItem } from "actions/categories/categoryActions";
import CategorySubItem from "components/categories/CategorySubItem";

class CategoryItem extends React.Component {
  render() {
    const { name, spent, _id } = this.props.item;
    const { budgetId, categoryId } = this.props;

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
