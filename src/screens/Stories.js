import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { css, cx } from 'react-emotion';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { actions } from 'modules/stories.js';
import * as api from 'utils/api';

import StoryList from 'screens/stories/StoryList';

const customContainer = css`
  background-color: #fff;
  padding: 1rem;
`;

const customSpan = css`
  display: block;
  width: 1rem;
  height: 100%;
  margin: 0 auto;
`;

const customContent = css`
  .to-top {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
  }
`;

class Stories extends Component {
  constructor(props) {
    super(props);
    this.requestStories = this.requestStories.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.requestStories();
  }

  handleScroll() {
    if (document.documentElement.scrollTop > 580) {
      this.toTopButton.style.display = 'block';
    } else {
      this.toTopButton.style.display = 'none';
    }
  }

  requestStories() {
    this.props.requestStories(api.url);
  }

  render() {
    return (
      <div>
        <div className="section">
          <div className={cx('container', customContainer)}>
            {this.props.isFetchingStories ? (
              <span className={customSpan}>
                <FontAwesomeIcon icon="spinner" size="2x" spin />
              </span>
            ) : (
              <div className={cx('content', customContent)}>
                <h1 className="title">The New York Times Top Stories</h1>
                <StoryList items={this.props.stories} />
                <button
                  ref={el => (this.toTopButton = el)}
                  className="button is-danger to-top"
                  onClick={() => (document.documentElement.scrollTop = 0)}
                >
                  To Top&nbsp;&nbsp;
                  <FontAwesomeIcon icon="angle-up" size="1x" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// Map state and dispatch() to the component props
const mapStateToProps = ({ stories }) => ({
  stories: stories.storiesById,
  isFetchingStories: stories.isFetchingStories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestStories: actions.requestStories
    },
    dispatch
  );

// Connect the container component to Redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stories);
