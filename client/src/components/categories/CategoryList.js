import React from "react";
import CategoryItem from "components/categories/CategoryItem";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCategoryItem } from "actions/categories/categoryActions";

class CategoryList extends React.Component {
  handleOnClick = () => {
    const { categoryId, addCategoryItem, budget } = this.props;

    addCategoryItem(budget._id, categoryId);
  };

  renderCategoryItems() {
    const { categories } = this.props.budget;
    const { categoryId } = this.props;

    const category = categories.find(category => category._id === categoryId);

    return category.categoryitems.map(item => {
      return (
        <CategoryItem
          key={item._id}
          item={item}
          categoryId={category._id}
          budgetId={this.props.budget._id}
        />
      );
    });
  }

  render() {
    return (
      <div className="category-list">
        {this.renderCategoryItems()}
        <div style={{ padding: "24px" }}>
          <button
            onClick={this.handleOnClick}
            className="button is-primary is-outlined"
          >
            Add Item
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ budgets: { budget } }) => {
  return { budget };
};

CategoryList.propTypes = {
  budget: PropTypes.object.isRequired,
  categoryId: PropTypes.string.isRequired,
  addCategoryItem: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { addCategoryItem }
)(CategoryList);
