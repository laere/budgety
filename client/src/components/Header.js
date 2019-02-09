import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a className="navbar-item" href="/auth/google">Login with Google</a>;
      default:
        return [
          <Link to="/budgets/new" className="navbar-item">New Budget</Link>,
          <a className="navbar-item" href="/api/logout">Logout</a>
        ];
    }
  }

  render() {
    return (
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Budgety
          </Link>
        </div>
        <div className="navbar-end">
          {this.renderContent()}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
