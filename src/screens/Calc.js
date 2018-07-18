import React, { Component } from 'react';
import { css, cx } from 'react-emotion';

import Screen from 'screens/calc/Screen';
import Keyboard from 'screens/calc/Keyboard';

const customBox = css`
  /* Overall calculator styles */
  .calculator {
    width: 18rem;
    border: 1px solid lightgray;
    box-shadow: 1px 1px 2px gray;
    background-image: -webkit-repeating-linear-gradient(
        top,
        hsla(0, 0%, 100%, 0) 0%,
        hsla(0, 0%, 100%, 0) 6%,
        hsla(0, 0%, 100%, 0.1) 7.5%
      ),
      -webkit-repeating-linear-gradient(top, hsla(0, 0%, 0%, 0) 0%, hsla(
              0,
              0%,
              0%,
              0
            )
            4%, hsla(0, 0%, 0%, 0.03) 4.5%),
      -webkit-repeating-linear-gradient(top, hsla(0, 0%, 100%, 0) 0%, hsla(
              0,
              0%,
              100%,
              0
            )
            1.2%, hsla(0, 0%, 100%, 0.15) 2.2%),
      linear-gradient(
        180deg,
        hsl(0, 0%, 78%) 0%,
        hsl(0, 0%, 90%) 47%,
        hsl(0, 0%, 78%) 53%,
        hsl(0, 0%, 70%) 100%
      );
  }
  /* Screen styles */
  .calculator .screen {
    height: 4rem;
    overflow-x: auto;
    font-size: 1.8em;
    font-weight: 440;
    border-radius: 5px;
    margin-bottom: 0.8rem;
    vertical-align: bottom;
    background-color: #86d6a0;
    border: 1px solid #7eb2a0;
    padding: 0 0.3rem 0 0.3rem;
    box-shadow: outset 2px 1px 2px gray;
  }
  /* Shared keyboard styles */
  .calculator .keyboard {
    background-color: transparent;
  }
  /* Digit keyboard styles */
  .calculator .keyboard .digit_keys {
    width: 78%;
    float: left;
  }
  .calculator .keyboard .digit_keys .button {
    color: #fff;
    width: 2.4rem;
    background-color: black;
    border: 1px solid black;
    box-shadow: inset 1px 1px 2px gray;
  }
  .calculator .keyboard .digit_keys .button:active {
    box-shadow: none;
  }
  .calculator .keyboard .digit_keys .key-clear {
    border: 1px solid #f05252;
    background-color: #f05252;
    box-shadow: inset 1px 1px 2px #fc8989;
  }
  /* Operator keyboard styles */
  .calculator .keyboard .operator_keys {
    width: 22%;
    float: right;
  }
  .calculator .keyboard .operator_keys .button {
    color: #fff;
    width: 2.4rem;
    border: 1px solid #5a7ce3;
    background-color: #5a7ce3;
    box-shadow: inset 1px 1px 2px darkgray;
  }
  .calculator .keyboard .operator_keys .button:active {
    box-shadow: none;
  }
  .calculator .keyboard .operator_keys .key-equals {
    border-color: #eaa517;
    background-color: #eaa517;
    box-shadow: inset 1px 1px 2px #ffc95a;
  }
`;

class Calc extends Component {
  // Bind 'this' in class methods
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.handleDigitClick = this.handleDigitClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);

    // Set up initial state
    this.state = {
      currentOperand: [],
      operand_1: null,
      operand_2: null,
      operator: ''
    };
  }

  // Method to catch the ref element from the Screen component
  setRef(el) {
    this.screenDivRef = el;
  }

  // Method to handle the 'C' key clicks
  handleResetClick() {
    // Empty the screen
    this.screenDivRef.textContent = '';

    // ... and the state
    this.setState({
      currentOperand: [],
      operand_1: null,
      operand_2: null,
      operator: ''
    });
  }

  // Method to handle any digit key clicks
  handleDigitClick(e) {
    const digitOrPoint = e.target.textContent.trim();

    this.setState(
      prevState => ({
        // Keep pushing digits to an array. Once an operator key is clicked,
        // the array will become an operand number and will be saved separately in the state.
        currentOperand: [...prevState.currentOperand, digitOrPoint]
      }),
      () => {
        // Simultaneously, turn the current array into a string and output it to the screen
        const currentOperandText = this.state.currentOperand.join('');
        this.screenDivRef.textContent = currentOperandText;
      }
    );
  }

  // Method to handle any operator key clicks
  handleOperatorClick(e) {
    // If there is not enough data yet, just do nothing
    if (
      this.state.currentOperand.length === 0 &&
      this.state.operator.length === 0
    ) {
      return;
    }

    // Notify the user with a screen flash that the operation was successful
    this.screenDivRef.style.backgroundColor = '#aff7c6';
    setTimeout(() => {
      this.screenDivRef.style.backgroundColor = '#93e3ad';
    }, 6);

    // Get the operator itself
    const operator = e.target.textContent.trim();

    // Turn the array of digits entered so far into a number
    const operand = parseFloat(this.state.currentOperand.join(''));

    // If the the first operand is empty, save the number as operand_1.
    // Also save the operator and empty the current digit array.
    if (this.state.operand_1 === null) {
      this.setState({
        operand_1: operand,
        operator,
        currentOperand: []
      });
      return;
    }

    // Prepare calculations in advance
    const calculations = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b
    };

    if (this.state.operator !== '=') {
      // If the previous operator is not '=', save the number as operand_2
      this.setState(
        {
          operand_2: operand,
          currentOperand: []
        },
        () => {
          // Now that everything is ready, we can make the actual calculation
          const result = calculations[this.state.operator](
            this.state.operand_1,
            this.state.operand_2
          );

          // ... then output the result
          this.screenDivRef.textContent = result.toString();

          // ... and save the data for the next iteration:
          // the current result will become the first operand of the next calculation
          // which enables a sort of 'calculation chaining'. Notice: the operator may be '='.
          this.setState({
            operand_1: result,
            operand_2: null,
            operator
          });
        }
      );
    } else {
      // If the previous operator is '=', we only need to update the operator
      // to make a proper math expression for the next calculation.
      this.setState({
        operator,
        currentOperand: []
      });
    }
  }

  render() {
    return (
      <section className="section">
        <div className={cx('box', customBox)}>
          <div className="box calculator">
            <Screen {...this.props} setRef={this.setRef} />
            <Keyboard
              handleDigitClick={e => this.handleDigitClick(e)}
              handleOperatorClick={e => this.handleOperatorClick(e)}
              handleResetClick={this.handleResetClick}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Calc;
