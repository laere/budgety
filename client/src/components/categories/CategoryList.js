import React from "react";
import CategoryItem from "components/categories/CategoryItem";
import { connect } from "react-redux";
import { addCategory } from "actions/categories/categoryActions";

class CategoryList extends React.Component {
  handleOnClick = () => {};

  render() {
    console.log(this.props.budget);
    return (
      <div style={{ marginTop: "40px" }}>
        <table className="table is-fullwidth">
          <tbody>
            <CategoryItem />
          </tbody>
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
  { addCategory }
)(CategoryList);
