import './App.css';
import React from 'react';

//disable eval rule
/* eslint no-eval: 0 */

//variables
const isOperator = /[x/+-]/,
    endsWithOperator = /[x+-/]$/,
    endsWithNegativeSign = /\d[x/+-]{1}-$/,
    clearStyle = {background: 'red'},
    operatorStyle = {background: 'blue'},
    equalsStyle = {
        background: 'green',
        position: 'absolute',
        height: 130,
        bottom: 5
    };

//app components
//component: calculator frame
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVal: '0',
            prevVal: '0',
            formula: '',
            currentSign: 'pos',
            lastClicked: ''
        };
        //bind event handlers (or methods) to component-class
        this.initialize = this.initialize.bind(this);
        this.handleNumbers = this.handleNumbers.bind(this);
        this.handleOperators = this.handleOperators.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
        this.handleEvaluate = this.handleEvaluate.bind(this);
        this.maxDigitWarning = this.maxDigitWarning.bind(this);
    }

    //methods || event handlers
   
    //method: initialize
    initialize() {
        this.setState({
            currentVal: '0',
            prevVal: '0',
            formula: '',
            currentSign: 'pos',
            lastClicked: '',
            evaluated: false
        });
    }

    //method: handleNumbers
    handleNumbers(e){
        if(!this.state.currentVal.includes('Limit')){
            //get current state values
            const {currentVal, formula, evaluated} = this.state;
            //fetch new value, element that triggered method 
            const value = e.target.value;
            //set state's value as unevaluated
            this.setState({
                evaluated: false
            });
            //set max number of digits as 21
            if(currentVal.length > 21) {
                this.maxDigitWarning();
            } else if(evaluated) {
                //if new value is evaluated, update state with new value
                this.setState({
                    currentVal: value,
                    //update formula: if value is not 0, clear value
                    formula: value !== '0' ? value: ''
                });
            } else {
                this.setState({
                    currentVal: 
                        //if current value is 0 or the current value is an operator, replace the current value with the new value
                        currentVal === '0' || isOperator.test(currentVal) 
                        ? value
                        //else add new value to current value
                        : currentVal + value,
                    formula: 
                        //if current value is 0 and new value is 0, check if formula is clear
                        currentVal === '0' && value === '0'
                        //if formula is clear, update formula with new value of 0
                        ? formula === ''
                            ? value
                            // else update formula with current formula
                            : formula
                        //else if formula has multiple 0s, 
                        : /([^.0-9]0|^0)$/.test(formula) 
                        // replace the formula with the new value
                        ? formula.slice(0, -1) + value
                        // else add new value to formula
                        : formula + value
                });
            }

        }
    }
    
    //method: handleOperators
    handleOperators(e){
        //if the current value does not include 'Limit' (has not reached the limit for the number of digits), evaluate the value
        if(!this.state.currentVal.includes('Limit')) {
            //fetch value that triggered event handler
            const value = e.target.value;
            //fetch current formula, previous value, and evaluated state
            const {formula, prevVal, evaluated} = this.state;
            //update current value with new value and declare new value as unevaluated
            this.setState({
                currentVal: value,
                evaluated: false
            });
            //if new value is evaluated
            if (evaluated) {
                //update formula to be previous value with new value
                this.setState({formula: prevVal + value});
            } else if (!endsWithOperator.test(formula)) {
                //else if the formula does not end with an operator,  update state
                this.setState({
                    //update previous value with formula
                    prevVal: formula,
                    //update current formula by appending new value
                    formula: formula + value
                });
            } else if (!endsWithNegativeSign.test(formula)) {
                //else if the formula ends with a negative sign, update state
                this.setState({
                    //if the expression (formula + value) ends with a negative sign, update formula with the expression (formula + value),
                    //else update formula with the expression (prevVal + value)
                    formula: (endsWithNegativeSign.test(formula + value) ? formula : prevVal) + value
                });
            } else if (value !== '-') {
                //else if the new value is, '-', update formula by appending '-' to the new value
                this.setState({
                    formula: prevVal + value
                });
            }
        }
    }

    //method: handleDecimal
    handleDecimal() {
        //if the state is evaluated,set decimal point to currentVal and formula
        if(this.state.evaluated === true){
            this.setState({
                currentVal: '0.',
                formula: '0.',
                evaluated: false
            });
        } else if (
            //else if the state's current value does not include a decimal point AND the digit's limit is not met
            !this.state.currentVal.includes('.') &&
            !this.state.currentVal.includes('Limit')
        ){
            //update state as unevaluated
            this.setState({evaluated: false});
            //check if the digit limit is exceeded
            if(this.state.currentVal.length > 21) {
                this.maxDigitWarning();
            } else if(
                //else if the formula ends with an operator or (the current value is 0 and the formula is empty)
                endsWithOperator.test(this.state.formula) || (this.state.currentVal === '0' && this.state.formula === '')
            ){
                //set decimal point to currentVal and formula
                this.setState({
                    currentVal: '0.',
                    formula: this.state.formula + '0.'
                });
            } else {
                this.setState({
                    //fetch current value and append a decimal point to it
                    currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',                
                    //append a decimal point to the formula
                    formula: this.state.formula + '.'
                });
            }
        }
    }

    //method: handleEvaluate
    handleEvaluate() {
        //if the digit limit has not been met
        if(!this.state.currentVal.includes('Limit')) {
            //create variable, expression, to hold formula
            let expression = this.state.formula;
            //while the formula ends with an operator
            while(endsWithOperator.test(expression)) {
                //copy expression
                expression = expression.slice(0, -1);
            }
            expression = expression
                .replace(/x/g, '*')//replace 'x' with '*'
                .replace(/-/g, '-')//replace '-' with '-'
                .replace('--', '+0+0+0+0+0+0+');//replace '--' with iterations of adding 0
            //store answer with rounded expression
            let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
            //update state
            this.setState({
                //set current value to stringified answer
                currentVal: answer.toString(),
                //update formula
                formula:
                 expression
                    .replace(/-/g, '-')//replace '-' with '-'
                    .replace('+0+0+0+0+0+0+', '--')//replace iterations of '+-' with '--'
                    .replace(/(x|\/|\+)-/, '$1-')//replace operators with '$1-'
                    .replace(/^-/, '-')//replace beginning char '-' with '-'
                    + '=' + answer,//append '=' and answer
                //set answer as previous value
                prevVal: answer,
                //declare state evaluated
                evaluated: true
            });
        }
    }

    //method: maxDigitWarning
    maxDigitWarning(){
        //update state
        this.setState({
            currentVal: 'Digit Limit Met',//display that digit limit is met
            prevVal: this.state.currentVal//set current value as previous value
        });
        //set current value to previous value and delay for 1s
        setTimeout(() => this.setState({currentVal: this.state.prevVal}), 1000);
    }

    //render calculator component
    render() {
        return (
            <div>
                {/*section: calculator*/}
                <div className="calculator">
                    <Formula 
                        formula={this.state.formula}
                    />
                    <Output 
                        currentValue={this.state.currentVal}
                    />
                    <Buttons 
                        initialize={this.initialize}
                        numbers={this.handleNumbers}
                        decimal={this.handleDecimal}
                        operators={this.handleOperators}
                        evaluate={this.handleEvaluate}
                    />
                </div>
                {/*section: credits*/}
                <div className="author">
                    Designed and Coded by <br />
                    <a href="https://github.com/dahvid10" target="_blank" rel="noreferrer">
                        David Mkoji
                    </a>
                    <br />
                    <br />
                    Thanks to work by <br />
                    <a href="https://goo.gl/6NNLMG" target="_blank" rel="noreferrer">
                        Peter Weinberg
                    </a>
                </div>
            </div>
        );
    }
}

//component: buttons
class Buttons extends React.Component {
    //render buttons component
    render() {
        return (
            <div>
                {/*button: AC */}
                <button
                    className="jumbo"
                    id="clear"
                    onClick={this.props.initialize}//link event-handler 'initialize'
                    style={clearStyle}
                    value="AC"
                >
                    AC
                </button>
                {/*button: / (divider) */}
                <button
                    id="divide"
                    onClick={this.props.operators}//link event-handler 'handleOperators'
                    style={operatorStyle}
                    value="/"
                >
                    /
                </button>
                {/*button: x (multiplier) */}
                <button
                    id="multiply"
                    onClick={this.props.operators}//link event-handler 'handleOperators'
                    style={operatorStyle}
                    value="x"
                >
                    x
                </button>
                {/*button: 7 */}
                <button
                    id="seven"
                    onClick={this.props.numbers}//link event-handler 'handleNumbers'
                    value="7"
                >
                    7
                </button>
                {/*button: 8 */}
                <button
                    id="eight"
                    onClick={this.props.numbers}//link event-handler 'handleNumbers'
                    value="8"
                >
                    8
                </button>
                {/*button: 9 */}
                <button
                    id="nine"
                    onClick={this.props.numbers}//link event-handler 'handleNumbers'
                    value="9"
                >
                    9
                </button>
                {/*button: - (subtract) */}
                <button
                    id="subtract"
                    onClick={this.props.operators}//link event-handler 'handleOperators'
                    value="-"
                >
                    -
                </button>
                {/*button: 4 */}
                <button
                    id="four"
                    onClick={this.props.numbers}//link event-handler 'handleNumbers'
                    value="4"
                >
                    4
                </button>
                {/*button: 5 */}
                <button
                    id="five"
                    onClick={this.props.numbers}//link event-handler 'handleNumbers'
                    value="5"
                >
                    5
                </button>
                {/*button: 6 */}
                <button
                    id="six"
                    onClick={this.props.numbers}//link event-handler 'handleNumbers'
                    value="6"
                >
                    6
                </button>
                {/*button: + (add) */}
                <button
                    id="add"
                    onClick={this.props.operators}//link event-handler 'handleOperators'
                    value="+"
                >
                    +
                </button>
                {/*button: 1 */}
                <button
                    id="one"
                    onClick={this.props.numbers}//link event-handler 'handleNumbers'
                    value="1"
                >
                    1
                </button>
                {/*button: 2 */}
                <button
                    id="two"
                    onClick={this.props.numbers}//link event-handler 'handleNumbers'
                    value="2"
                >
                    2
                </button>
                {/*button: 3 */}
                <button
                    id="three"
                    onClick={this.props.numbers}//link event-handler 'handleNumbers'
                    value="3"
                >
                    3
                </button>
                {/*button: 0 */}
                <button
                    className="jumbo"
                    id="zero"
                    onClick={this.props.numbers}//link event-handler 'handleNumbers'
                    value="0"
                >
                    0
                </button>
                {/*button: . */}
                <button
                    id="decimal"
                    onClick={this.props.decimal}//link event-handler 'handleEvaluate'
                    value="."
                >
                    .
                </button>
                {/*button: = */}
                <button
                    id="equals"
                    onClick={this.props.evaluate}//link event-handler 'handleEvaluate'
                    style={equalsStyle}
                    value="="
                >
                    =
                </button>
            </div>
        );
    }
}

//component: output
class Output extends React.Component {
    //render output component
    render() {
        return (
            //display current value
            <div 
                className="outputScreen"
                id="display"
            >
                {this.props.currentValue}
            </div>
        );        
    }
}

//component: formula
class Formula extends React.Component {
    //render formula component
    render() {
        return (
            //display formula
            <div
                className="formulaScreen"
            >
                {this.props.formula}
            </div>
        );
    }
}

//render React element, Calculator, into the DOM in the supplied container, 'app' (found in html file)
export default Calculator