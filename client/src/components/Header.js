import accounting from "accounting-js";
import React from "react";
import { fetchUser } from "actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Header extends React.Component {
  renderContent() {
    const { auth } = this.props;
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <a className="navbar-item" href="/auth/google">
            Login with Google
          </a>
        );
      default:
        return [
          <div key="1" className="navbar-item">
            Current balance: {accounting.formatMoney(auth.totalBalance)}
          </div>,
          <Link
            to="/budgets/new"
            key="3"
            className="button is-fullwidth is-danger is-rounded is-outlined is-inverted"
            style={{ margin: "auto" }}
          >
            New Budget
          </Link>,
          <a key="4" className="navbar-item" href="/api/logout">
            Logout
          </a>
        ];
    }
  }

  render() {
    return (
      <nav className="navbar is-primary">
        <div className="navbar-start">
          <Link to={this.props.auth ? "/budgets" : "/"} className="navbar-item">
            Budgety
          </Link>
        </div>
        <div className="navbar-end">{this.renderContent()}</div>
      </nav>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object,
  fetchUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(Header);
