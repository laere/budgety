import React from "react";
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
    const icon = showcategory ? "fas fa-angle-up" : "fas fa-angle-down";

    return (
      <div style={{ marginTop: "30px" }}>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{this.props.category.name}</p>
            <p
              className={`card-header-icon ${icon}`}
              onClick={this.toggleCategory}
            />
          </header>
          <div>
            {showcategory ? (
              <CategoryList categoryId={this.props.category._id} />
            ) : (
              false
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
