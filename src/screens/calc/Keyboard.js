import React from 'react';

const Keyboard = ({
  handleDigitClick,
  handleOperatorClick,
  handleResetClick
}) => (
  <div className="box keyboard is-clearfix">
    <div className="buttons digit_keys">
      <button className="button" onClick={handleDigitClick}>
        7
      </button>
      <button className="button" onClick={handleDigitClick}>
        8
      </button>
      <button className="button" onClick={handleDigitClick}>
        9
      </button>
      <button className="button" onClick={handleDigitClick}>
        4
      </button>
      <button className="button" onClick={handleDigitClick}>
        5
      </button>
      <button className="button" onClick={handleDigitClick}>
        6
      </button>
      <button className="button" onClick={handleDigitClick}>
        1
      </button>
      <button className="button" onClick={handleDigitClick}>
        2
      </button>
      <button className="button" onClick={handleDigitClick}>
        3
      </button>
      <button className="button" onClick={handleDigitClick}>
        0
      </button>
      <button className="button key-clear" onClick={handleResetClick}>
        C
      </button>
    </div>
    <div className="buttons operator_keys">
      <button className="button" onClick={handleOperatorClick}>
        /&nbsp;
      </button>
      <button className="button" onClick={handleOperatorClick}>
        *&nbsp;
      </button>
      <button className="button" onClick={handleOperatorClick}>
        -&nbsp;
      </button>
      <button className="button" onClick={handleOperatorClick}>
        +
      </button>
      <button className="button key-equals" onClick={handleOperatorClick}>
        =
      </button>
    </div>
  </div>
);

export default Keyboard;
