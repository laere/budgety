import React from "react";
import CategoryItem from "components/categories/CategoryItem";
import { connect } from "react-redux";
import { addCategoryItem } from "actions/categories/categoryActions";

class CategoryList extends React.Component {
  handleOnClick = () => {
    const budgetId = this.props.budget._id;
    const { categoryId } = this.props;

    this.props.addCategoryItem(budgetId, categoryId);
  };

  renderCategoryItems() {
    const { categories } = this.props.budget;
    const { categoryId } = this.props;

    const category = categories.find(category => category._id === categoryId);

    return category.categoryitems.map(item => {
      return <CategoryItem key={item._id} item={item} />;
    });
  }

  render() {
    console.log(this.props);
    return (
      <div style={{ marginTop: "40px" }}>
        <table className="table is-fullwidth">
          <tbody>{this.renderCategoryItems()}</tbody>
        </table>
        <footer className="card-footer" onClick={this.handleOnClick}>
          <div className="card-footer-item">Add item</div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({ budgets: { budget } }) => {
  return { budget };
};

export default connect(
  mapStateToProps,
  { addCategoryItem }
)(CategoryList);
