import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent(){
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href="/auth/google">Login With Google</a>;
      default:
        return <a href="/api/logout">Logout</a>
    }
  }

  render () {
    return (
      <div className="header">
        <Link
          to={ this.props.auth ? '/' : '/'}
        >
        Ball On
        </Link>
        <div>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
function mapStateToProps({ auth }) {
  return {
    auth
  };
}
export default connect(mapStateToProps)(Header);
