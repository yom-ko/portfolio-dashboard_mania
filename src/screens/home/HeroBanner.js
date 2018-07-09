import React from 'react';
import PropTypes from 'prop-types';

const HeroBanner = ({ title, subtitle }) => (
  <section className="hero is-medium is-primary is-bold">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">{title}</h1>
        <h2 className="subtitle">{subtitle}</h2>
      </div>
    </div>
  </section>
);

HeroBanner.defaultProps = {
  title: 'Hero title',
  subtitle: 'Hero subtitle'
};

HeroBanner.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default HeroBanner;
