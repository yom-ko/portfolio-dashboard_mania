import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'modules/stories.js';
import { css, cx } from 'react-emotion';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
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

class Stories extends Component {
  constructor(props) {
    super(props);
    this.requestStories = this.requestStories.bind(this);
  }

  componentDidMount() {
    this.requestStories();
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
              <div className="content">
                <h1 className="title">The New York Times Top Stories</h1>
                <StoryList items={this.props.stories} />
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
  stories: stories.items,
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
