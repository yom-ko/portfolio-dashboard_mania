import React from 'react';
import { css, cx } from 'react-emotion';

// import Button from 'components/Button';
import MainText from 'components/MainText';
import HeroBanner from 'screens/home/HeroBanner';

const customContainer = css`
  background-color: #fff;
  padding: 1rem;
`;

const Home = () => (
  <div>
    <div className="container">
      <HeroBanner title="Dashboard Mania" subtitle="Where dashboards thrive!" />
    </div>

    <section className="section">
      <div className={cx('container', customContainer)}>
        <div className="content">
          <MainText>
            Hey, this is my first portfolio project! Check it out!
          </MainText>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
