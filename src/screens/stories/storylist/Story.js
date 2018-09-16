import React from 'react';
import PropTypes from 'prop-types';

export const Story = ({ item }) => {
  const { url, title, abstract, section, subsection, multimedia } = item[1];
  const image = multimedia[1];

  return (
    <div className="tile is-child box">
      {/* Picture (if any) */}
      {image && (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <figure
            className="image is-128x128 is-pulled-right"
            style={{ margin: 0, marginLeft: '1rem' }}
          >
            <img src={image.url} alt={image.caption} />
          </figure>
        </a>
      )}
      {/* Title */}
      <a href={url} target="_blank" rel="noopener noreferrer">
        <h2 className="title is-5">{title}</h2>
      </a>
      {/* Abstract */}
      <p style={{ marginTop: '0.8rem', marginBottom: '0.8rem' }}>{abstract}</p>
      {/* Section tags */}
      <span style={{ fontSize: '0.85em' }}>Section: </span>
      <div style={{ display: 'inline-block' }}>
        <span className="tag is-light is-rounded">{section}</span>
        {subsection && (
          <>
            <span>&nbsp;&gt;&nbsp;</span>
            <span className="tag is-light is-rounded">{subsection}</span>
          </>
        )}
      </div>
    </div>
  );
};

Story.propTypes = {
  item: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired
};

export default Story;
