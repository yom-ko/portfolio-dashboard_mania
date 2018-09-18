import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { css } from 'react-emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions } from 'modules/stories.js';
import * as api from 'utils/api';

import Button from 'components/Button.js';
import StoryList from 'screens/stories/StoryList';

const storiesStyles = css`
  .spinner {
    display: block;
    width: 1rem;
    height: 100%;
    margin: 0 auto;
  }
  .to_top {
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
    this.toTopButtonEl = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.requestStoriesIfNeeded();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.toTopButtonEl) {
      if (document.documentElement.scrollTop > 580) {
        this.toTopButtonEl.current.style.display = 'block';
      } else {
        this.toTopButtonEl.current.style.display = 'none';
      }
    }
  }

  requestStoriesIfNeeded() {
    const { storiesInvalidated, requestStories } = this.props;
    if (storiesInvalidated) {
      requestStories(api.url);
    }
  }

  render() {
    const { lastUpdated, requestStories, isFetchingStories, stories } = this.props;

    return (
      <div className={storiesStyles}>
        <section className="container box">
          <h1 className="title">The New York Times Top Stories</h1>
          <p style={{ fontSize: '0.90rem' }}>
            Last updated at: &nbsp;
            {lastUpdated}
          </p>
          <Button
            mod="is-warning"
            modCss={{ marginBottom: '1rem' }}
            handleClick={() => {
              requestStories(api.url);
            }}
          >
            Refresh
          </Button>

          {isFetchingStories && (
            <span className="spinner">
              <FontAwesomeIcon icon="spinner" size="2x" spin />
            </span>
          )}

          {!isFetchingStories && (
            <div>
              <StoryList items={stories} />
              <button
                type="button"
                ref={this.toTopButtonEl}
                className="button is-danger to_top"
                onClick={() => (document.documentElement.scrollTop = 0)}
              >
                To Top&nbsp;&nbsp;
                <FontAwesomeIcon icon="angle-up" size="1x" />
              </button>
            </div>
          )}
        </section>
      </div>
    );
  }
}

// Map state and dispatch() to the component props
const mapStateToProps = ({ stories }) => ({
  stories: stories.storiesById,
  isFetchingStories: stories.isFetchingStories,
  lastUpdated: stories.lastUpdated,
  storiesInvalidated: stories.invalidated
});

const mapDispatchToProps = dispatch => bindActionCreators(
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
