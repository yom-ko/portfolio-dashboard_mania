import React from 'react';

import MainText from 'components/MainText';

const Home = () => (
  <section className="container">
    <div className="box">
      <MainText>
        This is my first &quot;portfolio&quot;/showcase project of &quot;more than just a landing
        page&quot; type that I`m going to hone for the upcoming month or so (please consider it a
        work in progress).
      </MainText>
      <br />
      <MainText>
        It&apos;s idea is dead simple — just a bunch of mini apps (think paginated lists with
        filters, async API calls, etc.) under the same roof. While (obviously) not very exciting,
        this concept will allow me to familiarize myself with the common web development challenges.
        The project will serve as a foundation for my future progress.
      </MainText>
      <br />
      <MainText>
        I have built this project &quot;from scratch&quot;, meaning no boilerplates – just Webpack 4
        and stuff (yeah, it has taken time to make everything play nicely together).
      </MainText>
      <br />
      <MainText>
        The project structure is heavily inspired by&nbsp;&quot;
        <a
          href="https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fractal
        </a>
        &quot; (do click, it&apos;s worth taking a look).
      </MainText>
      <br />
      <MainText style={{ textDecoration: 'underline' }}>
        Key (and equally AWESOME) libs used in this project:
      </MainText>
      <ul>
        <li>View Layer - React (react + react-dom)</li>
        <li>
          Styling:
          <ul>
            <li>&nbsp;&nbsp;CSS Framework - Bulma</li>
            <li>
              &nbsp;&nbsp;Custom Styling - Emotion (emotion + react-emotion + babel-plugin-emotion)
            </li>
            <li>
              &nbsp;&nbsp;Icons - Fontawesome (fontawesome + fontawesome-svg-core +
              free-solid-svg-icons + react-fontawesome)
            </li>
          </ul>
        </li>
        <li>State Management - Redux (redux + react-redux)</li>
        <li>Side Effect Management - Redux-Saga (redux-saga)</li>
        <li>Routing - React Router (react-router + react-router-dom + connected-react-router)</li>
      </ul>
    </div>
  </section>
);

export default Home;
