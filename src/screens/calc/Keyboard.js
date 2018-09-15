import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css } from 'react-emotion';

const keyboardStyles = css`
  /* Shared keyboard styles */
  .box {
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    background-color: transparent;
  }
  .box .buttons .button {
    color: #fff;
  }
  .box .buttons .button:active {
    box-shadow: none !important;
  }

  /* Service keyboard styles */
  .buttons.service_keys .button {
    width: 2.8rem;
    margin-right: 0.4rem;
  }
  .buttons.service_keys .button.key_reset {
    border: 1px solid #f00808;
    background-color: #f00808;
    box-shadow: inset 1px 1px 2px #fc8989;
  }
  .buttons.service_keys .button.key_delete {
    border: 1px solid #ff4343;
    background-color: #ff4343;
    box-shadow: inset 1px 1px 2px #fc8989;
  }

  /* Digit keyboard styles */
  .buttons.digit_keys {
    width: 70%;
    float: left;
  }
  .buttons.digit_keys .button {
    width: 2.8rem;
    height: 2.8rem;
    margin-right: 0.4rem;
    background-color: black;
    border: 1px solid black;
    box-shadow: inset 1px 1px 2px gray;
  }

  /* Operator keyboard styles */
  .buttons.operator_keys {
    width: 30%;
    float: right;
  }
  .buttons.operator_keys .button {
    width: 2.8rem;
    height: 2.8rem;
    margin-right: 0;
    margin-left: auto;
    border: 1px solid #4d74f7;
    background-color: #4d74f7;
    box-shadow: inset 1px 1px 2px #7c9bff;
  }
  .buttons.operator_keys .button.key_equals {
    border-color: #f06f0d;
    background-color: #f06f0d;
    box-shadow: inset 1px 1px 2px #ffc95a;
  }
`;

const Keyboard = ({
  handleReset,
  handleDeleteCurrent,
  handleDeleteDigit,
  handleDigitClick,
  handleNegateClick,
  handleOperatorClick
}) => (
  <div className={keyboardStyles}>
    <div className="box is-clearfix">
      <div className="buttons service_keys">
        <button type="button" className="button key_reset" onClick={handleReset}>
          C
        </button>
        <button type="button" className="button key_delete" onClick={handleDeleteCurrent}>
          CE
        </button>
        <button type="button" className="button key_delete" onClick={handleDeleteDigit}>
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
          className="button key_equals"
          operator="="
          onClick={handleOperatorClick}
        >
          <FontAwesomeIcon icon="equals" size="xs" />
        </button>
      </div>
    </div>
  </div>
);

export default Keyboard;
