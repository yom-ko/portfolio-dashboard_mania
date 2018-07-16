import React, { Component } from 'react';
import { css, cx } from 'react-emotion';

import Screen from 'screens/calc/Screen';
import Keyboard from 'screens/calc/Keyboard';

const customBox = css`
  .calculator {
    width: 16.5rem;
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
  .calculator .screen {
    height: 4rem;
    font-size: 1.8em;
    font-weight: 440;
    overflow-x: auto;
    border-radius: 5px;
    margin-bottom: 0.8rem;
    vertical-align: bottom;
    background-color: #86d6a0;
    border: 1px solid #7eb2a0;
    padding: 0 0.3rem 0 0.3rem;
    box-shadow: outset 2px 1px 2px gray;
  }
  .calculator .keyboard {
    background-color: transparent;
  }
  .calculator .keyboard .digit_keys {
    width: 80%;
    float: left;
  }
  .calculator .keyboard .digit_keys .button {
    color: #fff;
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
  .calculator .keyboard .operator_keys {
    width: 20%;
    float: right;
  }
  .calculator .keyboard .operator_keys .button {
    color: #fff;
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
