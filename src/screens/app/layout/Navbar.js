import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { css } from 'react-emotion';
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

  .navbar-item > .button:focus:not(:active) {
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

export class Navbar extends React.Component {
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
    const { currentPath } = this.props;

    return (
      <div className={navbarStyles}>
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
                  <NavLink
                    className={currentPath === '/' ? 'button active-button' : 'button'}
                    to="/"
                  >
                    Home
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink
                    className={currentPath === '/todolist' ? 'button active-button' : 'button'}
                    to="/todolist"
                  >
                    Todolist
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink
                    className={currentPath === '/stories' ? 'button active-button' : 'button'}
                    to="/stories"
                  >
                    Stories
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink
                    className={currentPath === '/calc' ? 'button active-button' : 'button'}
                    to="/calc"
                  >
                    Calc
                  </NavLink>
                </div>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <NavLink
                    className={
                      currentPath === '/login' ? 'button active-button is-text' : 'button is-text'
                    }
                    to="/login"
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
      </div>
    );
  }
}

const mapStateToProps = ({ router }) => ({
  currentPath: router.location.pathname
});

// Connect the container component to Redux store
export default connect(mapStateToProps)(Navbar);