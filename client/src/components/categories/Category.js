import React from "react";
import Moment from "react-moment";
import CategoryList from "components/categories/CategoryList";

class Category extends React.Component {
  state = { showcategory: false };

  toggleCategory = () => {
    const { showcategory } = this.state;

    this.setState({ showcategory: !showcategory });

    console.log(this.state);
  };

  render() {
    const { showcategory } = this.state;
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={this.toggleCategory}
          >
            <span>Dropdown button</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>
        <div>{showcategory ? <CategoryList /> : false}</div>
      </React.Fragment>
    );
  }
}

export default Category;
