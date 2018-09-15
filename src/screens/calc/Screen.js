import React from 'react';
import { css } from 'react-emotion';

const screen = css`
  font-family: 'Digital7';
  height: 4.5rem;
  overflow-x: auto;
  font-size: 2.2em;
  font-weight: 440;
  border-radius: 5px;
  margin-bottom: 0.8rem;
  vertical-align: bottom;
  background-color: #86d6a0;
  border: 1px solid #7eb2a0;
  padding: 0 0.3rem 0 0.3rem;
  box-shadow: outset 2px 1px 2px gray;
`;

const Screen = React.forwardRef((props, ref) => <div className={screen} ref={ref} />);

export default Screen;
