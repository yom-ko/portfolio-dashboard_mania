import React from 'react';
import PropTypes from 'prop-types';

export const Story = ({ item, mediaObj, withSubsection }) => (
  <div className="tile is-child box">
    {/* Picture */}
    <a href={item[1].url} target="_blank" rel="noopener noreferrer">
      <figure
        className="image is-128x128 is-pulled-right"
        style={{ margin: '0em', marginLeft: '0.9em' }}
      >
        <img
          src={typeof mediaObj === 'undefined' ? '' : mediaObj.url}
          alt={typeof mediaObj === 'undefined' ? '' : mediaObj.caption}
        />
      </figure>
    </a>
    {/* Title */}
    <a href={item[1].url} target="_blank" rel="noopener noreferrer">
      <h2 className="subtitle is-5">{item[1].title}</h2>
    </a>
    {/* Abstract */}
    <p>{item[1].abstract}</p>
    {/* Section tags */}
    <span style={{ fontSize: '0.85em' }}>Section: </span>
    <div style={{ display: 'inline-block' }}>
      <span className="tag is-light is-rounded">{item[1].section}</span>
    </div>
    {withSubsection ? (
      <div style={{ display: 'inline-block' }}>
        &nbsp;{'> '}
        <span className="tag is-light is-rounded">{item[1].subsection}</span>
      </div>
    ) : (
      ''
    )}
  </div>
);

Story.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  withSubsection: PropTypes.bool.isRequired
};

export default Story;
