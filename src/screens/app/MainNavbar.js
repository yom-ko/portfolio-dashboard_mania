import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { css } from 'react-emotion';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const mainNavbarStyle = css`
  .navbar-item > .button {
    color: #fff;
    background-color: inherit;
    border-color: #c93c67;
  }

  .navbar-item > .button:hover {
    background-color: #b8335c;
  }

  .navbar-item > .button.active-button {
    background-color: #b8335c;
  }

  .navbar-item > .button:focus:not(:active) {
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

export class MainNavbar extends React.Component {
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
      <div className={mainNavbarStyle}>
        <nav
          className="navbar"
          style={{ backgroundColor: '#c93c67' }}
          aria-label="main navigation"
        >
          <div className="navbar-brand">
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
              <div className="navbar-item">
                <NavLink
                  className={
                    this.props.currentPath === '/'
                      ? 'button active-button'
                      : 'button'
                  }
                  to="/"
                  onClick={this.toggle}
                >
                  Home
                </NavLink>
              </div>
              <div className="navbar-item">
                <NavLink
                  className={
                    this.props.currentPath === '/todolist'
                      ? 'button active-button'
                      : 'button'
                  }
                  to="/todolist"
                  onClick={this.toggle}
                >
                  Todolist
                </NavLink>
              </div>
              <div className="navbar-item">
                <NavLink
                  className={
                    this.props.currentPath === '/stories'
                      ? 'button active-button'
                      : 'button'
                  }
                  to="/stories"
                  onClick={this.toggle}
                >
                  Stories
                </NavLink>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <NavLink
                  className="button is-text"
                  to="/login"
                  onClick={this.toggle}
                >
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
    );
  }
}

const mapStateToProps = ({ router }) => ({
  currentPath: router.location.pathname
});

// Connect the container component to Redux store
export default connect(mapStateToProps)(MainNavbar);
