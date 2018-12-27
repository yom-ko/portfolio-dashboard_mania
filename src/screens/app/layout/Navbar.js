import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
/* eslint-disable no-unused-vars */
import { css, jsx } from '@emotion/core';
/* eslint-enable */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navbarStyles = css`
  .navbar-item > .button {
    color: #fff;
    background-color: inherit;
    border-color: #c93c67;
  }

  .navbar-item > .button:hover {
    color: #fff;
    background-color: #b8335c;
  }

  .navbar-item > .button.active-button {
    background-color: #b8335c;
  }

  .navbar-item > .button:focus {
    color: #fff;
    background-color: #b8335c;
    border-color: #c93c67;
    box-shadow: none;
  }

  @media screen and (max-width: 1087px) {
    .navbar-menu {
      background-color: #c93c67;
    }
  }
`;

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState(prevState => {
      const { isOpen } = prevState;
      return {
        isOpen: !isOpen
      };
    });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div css={[navbarStyles]}>
        <div className="container">
          <nav
            className="navbar"
            style={{ backgroundColor: '#c93c67' }}
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <div
                className={isOpen ? 'navbar-burger burger is-active' : 'navbar-burger burger'}
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

            <div className={isOpen ? 'navbar-menu is-active' : 'navbar-menu'}>
              <div className="navbar-start">
                <div className="navbar-item">
                  <NavLink className="button" activeClassName="active-button" exact to="/">
                    Home
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink className="button" activeClassName="active-button" to="/todolist">
                    Todolist
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink className="button" activeClassName="active-button" to="/stories">
                    Stories
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink className="button" activeClassName="active-button" to="/calc">
                    Calc
                  </NavLink>
                </div>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <NavLink className="button is-text" activeClassName="active-button" to="/login">
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

export default Navbar;
