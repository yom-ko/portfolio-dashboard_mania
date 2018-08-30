import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Keyboard = ({
  handleDigitClick,
  handleOperatorClick,
  handleNegateClick,
  handleDeleteDigit,
  handleDeleteCurrent,
  handleReset
}) => (
  <div className="box keyboard is-clearfix">
    <div className="buttons has-addons service_keys">
      <button type="button" className="button key-reset" onClick={handleReset}>
        C
      </button>
      <button type="button" className="button key-delete" onClick={handleDeleteCurrent}>
        CE
      </button>
      <button type="button" className="button key-delete" onClick={handleDeleteDigit}>
        <FontAwesomeIcon icon="arrow-left" size="xs" />
      </button>
    </div>
    <div className="buttons digit_keys">
      <button type="button" className="button" onClick={handleDigitClick}>
        7
      </button>
      <button type="button" className="button" onClick={handleDigitClick}>
        8
      </button>
      <button type="button" className="button" onClick={handleDigitClick}>
        9
      </button>
      <button type="button" className="button" onClick={handleDigitClick}>
        4
      </button>
      <button type="button" className="button" onClick={handleDigitClick}>
        5
      </button>
      <button type="button" className="button" onClick={handleDigitClick}>
        6
      </button>
      <button type="button" className="button" onClick={handleDigitClick}>
        1
      </button>
      <button type="button" className="button" onClick={handleDigitClick}>
        2
      </button>
      <button type="button" className="button" onClick={handleDigitClick}>
        3
      </button>

      <button type="button" className="button" onClick={handleDigitClick}>
        .
      </button>
      <button type="button" className="button" onClick={handleDigitClick}>
        0
      </button>
      <button type="button" className="button" onClick={handleNegateClick}>
        +/-
      </button>
    </div>
    <div className="buttons operator_keys">
      <button type="button" className="button" operator="/" onClick={handleOperatorClick}>
        <FontAwesomeIcon icon="divide" size="xs" />
      </button>
      <button type="button" className="button" operator="*" onClick={handleOperatorClick}>
        <FontAwesomeIcon icon="times" size="xs" />
      </button>
      <button type="button" className="button" operator="-" onClick={handleOperatorClick}>
        <FontAwesomeIcon icon="minus" size="xs" />
      </button>
      <button type="button" className="button" operator="+" onClick={handleOperatorClick}>
        <FontAwesomeIcon icon="plus" size="xs" />
      </button>
      <button
        type="button"
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
