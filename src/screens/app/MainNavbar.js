import React from 'react';
import { NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import logo from 'screens/app/images/logo.png';

export default class MainNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="container">
        <div>
          <nav className="navbar" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <img
                  src={logo}
                  alt="Bulma: a modern CSS framework based on Flexbox"
                  width="45"
                  height="40"
                />
              </a>
              <div
                className={
                  this.state.isOpen
                    ? 'navbar-burger burger is-active'
                    : 'navbar-burger burger'
                }
                onClick={this.toggle}
                onKeyDown={this.toggle}
                role="button"
                tabIndex="0"
              >
                <span />
                <span />
                <span />
              </div>
            </div>

            <div
              className={
                this.state.isOpen ? 'navbar-menu is-active' : 'navbar-menu'
              }
            >
              <div className="navbar-start">
                <NavLink className="navbar-item" to="/" onClick={this.toggle}>
                  Home
                </NavLink>
                <NavLink
                  className="navbar-item"
                  to="/todolist"
                  onClick={this.toggle}
                >
                  Todolist
                </NavLink>
                <NavLink
                  className="navbar-item"
                  to="/stories"
                  onClick={this.toggle}
                >
                  NYT Stories
                </NavLink>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <NavLink className="button is-info" to="/login">
                    <span className="icon is-small">
                      <FontAwesomeIcon icon="sign-in-alt" />
                    </span>
                    <span>Login</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
