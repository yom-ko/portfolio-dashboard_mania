import React, { Component } from 'react';
import { css, cx } from 'react-emotion';

import Screen from 'screens/calc/Screen';
import Keyboard from 'screens/calc/Keyboard';

const customBox = css`
  .calculator {
    width: 16.5rem;
  }
  .calculator .screen {
    height: 3rem;
    background-color: #95c9b7;
    border-radius: 5px;
    margin-bottom: 0.8rem;
  }
  .calculator .keyboard .digit_keys {
    width: 80%;
    float: left;
  }
  .calculator .keyboard .operator_keys_side {
    width: 20%;
    float: right;
  }
  .calculator .keyboard .operator_keys_side .button {
    width: 40px;
    float: right;
  }
`;

class Calc extends Component {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.handleDigitClick = this.handleDigitClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);

    this.state = {
      currentOperand: [],
      operand_1: null,
      operand_2: null,
      operator: ''
    };
  }

  setRef(ref) {
    this.screenDivRef = ref;
  }

  handleResetClick() {
    this.screenDivRef.textContent = '';
    this.setState({
      currentOperand: [],
      operand_1: null,
      operand_2: null,
      operator: ''
    });
  }

  handleDigitClick(e) {
    const digit = Number(e.target.textContent);

    this.setState(
      prevState => ({
        currentOperand: [...prevState.currentOperand, digit]
      }),
      () => {
        const currentOperandText = this.state.currentOperand.join('');
        this.screenDivRef.textContent = currentOperandText;
      }
    );
  }

  handleOperatorClick(e) {
    if (
      this.state.currentOperand.length === 0 &&
      this.state.operator.length === 0
    ) {
      return;
    }

    const operator = e.target.textContent.trim();

    const operand = parseInt(this.state.currentOperand.join(''), 10);

    if (this.state.operand_1 === null) {
      this.setState({
        operand_1: operand,
        operator,
        currentOperand: []
      });
      return;
    }

    const calculations = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b
    };

    if (this.state.operator !== '=') {
      this.setState(
        {
          operand_2: operand,
          currentOperand: []
        },
        () => {
          const result = calculations[this.state.operator](
            this.state.operand_1,
            this.state.operand_2
          );

          this.screenDivRef.textContent = result.toString();

          this.setState({
            operand_1: result,
            operand_2: null,
            operator
          });
        }
      );
    } else {
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
