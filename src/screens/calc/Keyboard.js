import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const Keyboard = ({
  handleDigitClick,
  handleOperatorClick,
  handleNegativeClick,
  handleDeleteDigit,
  handleDeleteCurrent,
  handleReset
}) => (
  <div className="box keyboard is-clearfix">
    <div className="buttons has-addons service_keys">
      <button className="button key-reset" onClick={handleReset}>
        C
      </button>
      <button className="button key-delete" onClick={handleDeleteCurrent}>
        CE
      </button>
      <button className="button key-delete" onClick={handleDeleteDigit}>
        <FontAwesomeIcon icon="arrow-left" size="xs" />
      </button>
    </div>
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
        .
      </button>
      <button className="button" onClick={handleDigitClick}>
        0
      </button>
      <button className="button" onClick={handleNegativeClick}>
        +/-
      </button>
    </div>
    <div className="buttons operator_keys">
      <button className="button" operator="/" onClick={handleOperatorClick}>
        <FontAwesomeIcon icon="divide" size="xs" />
      </button>
      <button className="button" operator="*" onClick={handleOperatorClick}>
        <FontAwesomeIcon icon="times" size="xs" />
      </button>
      <button className="button" operator="-" onClick={handleOperatorClick}>
        <FontAwesomeIcon icon="minus" size="xs" />
      </button>
      <button className="button" operator="+" onClick={handleOperatorClick}>
        <FontAwesomeIcon icon="plus" size="xs" />
      </button>
      <button
        className="button key-equals"
        operator="="
        onClick={handleOperatorClick}
      >
        <FontAwesomeIcon icon="equals" size="xs" />
      </button>
    </div>
  </div>
);

export default Keyboard;
