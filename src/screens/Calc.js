import React, { Component } from 'react';
import { css } from 'react-emotion';

import Screen from 'screens/calc/Screen';
import Keyboard from 'screens/calc/Keyboard';

const calcStyles = css`
  /* Overall calculator styles */
  .calculator {
    width: 18rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    border: 1px solid lightgray;
    box-shadow: 1px 1px 2px gray;
    background-image: -webkit-repeating-linear-gradient(
        top,
        hsla(0, 0%, 100%, 0) 0%,
        hsla(0, 0%, 100%, 0) 6%,
        hsla(0, 0%, 100%, 0.1) 7.5%
      ),
      -webkit-repeating-linear-gradient(top, hsla(0, 0%, 0%, 0) 0%, hsla(0, 0%, 0%, 0) 4%, hsla(
              0,
              0%,
              0%,
              0.03
            )
            4.5%),
      -webkit-repeating-linear-gradient(top, hsla(0, 0%, 100%, 0) 0%, hsla(0, 0%, 100%, 0) 1.2%, hsla(
              0,
              0%,
              100%,
              0.15
            )
            2.2%),
      linear-gradient(
        180deg,
        hsl(0, 0%, 78%) 0%,
        hsl(0, 0%, 90%) 47%,
        hsl(0, 0%, 78%) 53%,
        hsl(0, 0%, 70%) 100%
      );
  }
`;

class Calc extends Component {
  // Bind 'this' in class methods
  constructor(props) {
    super(props);
    this.handleReset = this.handleReset.bind(this);
    this.handleDeleteCurrent = this.handleDeleteCurrent.bind(this);
    this.handleDeleteDigit = this.handleDeleteDigit.bind(this);
    this.handleDigitClick = this.handleDigitClick.bind(this);
    this.handleNegateClick = this.handleNegateClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);

    // Set up the initial state
    this.state = {
      currentOperand: [],
      operand1: null,
      operand2: null,
      operator: ''
    };
  }

  // Method to handle the 'C' key clicks
  handleReset() {
    // Empty the screen
    this.screenEl.textContent = '';

    // ... and the whole state
    this.setState({
      currentOperand: [],
      operand1: null,
      operand2: null,
      operator: ''
    });
  }

  // Method to handle the 'CE' key clicks
  handleDeleteCurrent() {
    const { currentOperand } = this.state;

    if (currentOperand.length === 0) {
      return;
    }

    // Empty the screen
    this.screenEl.textContent = '';

    // ... and the current operand
    this.setState({
      currentOperand: []
    });
  }

  // Method to handle the '<-' key clicks
  handleDeleteDigit() {
    const { currentOperand } = this.state;

    if (currentOperand.length === 0) {
      return;
    }

    // Delete the current digit
    const newCurrentOperand = [...currentOperand];
    newCurrentOperand.splice(-1, 1);

    const currentOperandText = newCurrentOperand.join('');
    this.screenEl.textContent = currentOperandText;

    this.setState({
      currentOperand: newCurrentOperand
    });
  }

  // Method to handle any digit key clicks
  handleDigitClick(e) {
    const { currentOperand } = this.state;

    const digitOrPoint = e.target.textContent.trim();
    const currentOperandHasPoint = currentOperand.some(el => el === '.');

    // Only one floating point is allowed!
    if (digitOrPoint === '.' && currentOperandHasPoint) {
      return;
    }

    this.setState(
      prevState => ({
        // Keep pushing digits to an array. Once an operator key is clicked,
        // the array will become an operand number and will be saved separately in the state.
        currentOperand: [...prevState.currentOperand, digitOrPoint]
      }),
      () => {
        const { currentOperand: justUpdatedCurrentOperand } = this.state;
        // Simultaneously, turn the current array into a string and output it to the screen
        const currentOperandText = justUpdatedCurrentOperand.join('');
        this.screenEl.textContent = currentOperandText;
      }
    );
  }

  // Method to handle negate toggle key clicks
  handleNegateClick() {
    const { currentOperand, operand1 } = this.state;

    // Only allow a sign on the existing number
    if (currentOperand.length === 0 && operand1 === null) {
      return;
    }

    if (currentOperand.length !== 0) {
      const newCurrentOperand = currentOperand;
      const currentOperandIsNegative = newCurrentOperand.some(el => el === '-');

      // Only one sign is allowed (either '-' or '+')!
      if (currentOperandIsNegative) {
        // Remove the '-' sign!
        newCurrentOperand.shift();
      } else {
        // Add '-' to the beginning of the currentOperand array
        newCurrentOperand.unshift('-');
      }

      // Update the state and the screen
      this.setState(
        {
          currentOperand: newCurrentOperand
        },
        () => {
          const { currentOperand: justUpdatedCurrentOperand } = this.state;
          const currentOperandText = justUpdatedCurrentOperand.join('');
          this.screenEl.textContent = currentOperandText;
        }
      );
      return;
    }

    // Now the operand1's sign needs to be updated. The logic is essentially the same.
    const operand1Ar = operand1.toString().split('');
    const operand1IsNegative = operand1Ar.some(el => el === '-');

    if (operand1IsNegative) {
      // Remove the '-' sign!
      operand1Ar.shift();
    } else {
      // Add '-' to the beginning of the array
      operand1Ar.unshift('-');
    }

    const newOperand1 = parseFloat(operand1Ar.join(''));

    this.setState(
      {
        operand1: newOperand1
      },
      () => {
        const { operand1: justUpdatedOperand1 } = this.state;
        const operand1Text = justUpdatedOperand1.toString();
        this.screenEl.textContent = operand1Text;
      }
    );
  }

  // Method to handle any operator key clicks
  handleOperatorClick(e) {
    const { currentOperand, operator: currentOperator, operand1 } = this.state;

    // If there is not enough data yet, just do nothing
    if (currentOperand.length === 0 && currentOperator.length === 0) {
      return;
    }

    // Get the operator itself
    const operator = e.currentTarget.getAttribute('operator').trim();

    // Notify the user with a screen flash that the operator was applied successfully
    this.screenEl.style.backgroundColor = '#aff7c6';
    setTimeout(() => {
      this.screenEl.style.backgroundColor = '#93e3ad';
    }, 4);

    // Turn the array of digits (entered so far) into a valid number with fraction support
    const operand = parseFloat(currentOperand.join(''));

    // If the the first operand is still empty, save the number as operand1.
    // Also save the operator and empty the current digit array.
    if (operand1 === null) {
      this.setState({
        operand1: operand,
        operator,
        currentOperand: []
      });
      return;
    }

    // If the first operand is already there but the current operand is empty,
    // then the user hasn't yet decided on the operation, so just update the operator
    // according to their choice.
    if (currentOperand.length === 0) {
      this.setState({
        operator
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

    if (currentOperator !== '=') {
      // If the current operator is not '=', save the number as operand2
      this.setState(
        {
          operand2: operand,
          currentOperand: []
        },
        () => {
          const {
            operator: justUpdatedOperator,
            operand1: justUpdatedOperand1,
            operand2: justUpdatedOperand2
          } = this.state;
          // Now that everything is ready, we can make the actual calculation
          const result = calculations[justUpdatedOperator](
            justUpdatedOperand1,
            justUpdatedOperand2
          );

          // ... then output the result
          this.screenEl.textContent = result.toString();

          // Wait a sec! If the result is 0, it hardly makes sense to save it
          // for further processing, so we`d better reset the state and return.
          if (result === 0) {
            this.setState({
              currentOperand: [],
              operand1: null,
              operand2: null,
              operator: ''
            });
            return;
          }

          // ... and save the data for the next iteration:
          // the current result will become the first operand of the next calculation
          // which enables a sort of 'calculation chaining'. Notice: the operator may be '='.
          this.setState({
            operand1: result,
            operand2: null,
            operator
          });
        }
      );
    } else {
      // If the previous operator is '=', we only need to update the operator
      // to compose a valid math expression for the next calculation.
      this.setState({
        operator,
        currentOperand: []
      });
    }
  }

  render() {
    return (
      <div className={calcStyles}>
        <section className="container box">
          <div className="box calculator">
            <Screen ref={el => (this.screenEl = el)} />
            <Keyboard
              handleReset={this.handleReset}
              handleDeleteCurrent={this.handleDeleteCurrent}
              handleDeleteDigit={this.handleDeleteDigit}
              handleDigitClick={e => this.handleDigitClick(e)}
              handleNegateClick={this.handleNegateClick}
              handleOperatorClick={e => this.handleOperatorClick(e)}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default Calc;
