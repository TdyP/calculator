(function(exports) {
  "use strict";

  function Calculator() {
    this.currentCalc = '';
  }

  /**
   * Make the actual calculation for given string
   *
   * @param  {String} str
   * @return {Number}     Result of calculation
   * @throws {SyntaxError} If malformed express
   */
  function solveStr(str) {
    // Handle parenthesis
    // Each parenthesis is evalued recursively and replaced by its result in the global string
    // Parenthesis are evalued from right to left
    while(str.indexOf('(') !== -1) {
      let lastOpeningParenthesisIdx = str.lastIndexOf('(');
      let closingParenthensisIdx = str.indexOf(')', lastOpeningParenthesisIdx);

      // Rebuild the string with parenthesis calculation result instead of expression
      let left = str.substring(0, lastOpeningParenthesisIdx);
      let middle = solveStr(str.substring(lastOpeningParenthesisIdx + 1, closingParenthensisIdx)); // Recursive call to evaluate parenthesis
      let right =  str.substring(closingParenthensisIdx + 1);

      str = left + middle + right;
    }

    // Handle exponents
    // For each exponent found, we look to the left to get the number and to the right to get the power
    // Then, the exponent expression is replaced by its result in the global string
    while(str.indexOf('^') !== -1) {
      let expIdx = str.indexOf('^');

      // Parse left hand to find number
      // We loop through all numbers on the left and keep the last one
      let match;
      let number = 0;
      let numberIdx = 0;
      let left = str.substring(0, expIdx);
      let re = /[\d\.]+/g; // Search any number, allowing floats
      while(match = re.exec(left)) {
        number = match[0];
        numberIdx = match.index;
      }

      // Parse right hand to find power
      // Power is the first number on the right
      let power = 1;
      let powerMatch = /[\d\.]+/.exec(str.substring(expIdx));
      power = powerMatch[0];
      let powerIdx = powerMatch.index;

      let expRes = Math.pow(number, power);
      let strLeft = str.substring(0, numberIdx);
      let strRight = str.substring(expIdx + 1 + power.length); // Take the rest of the string after the power
      str = strLeft + expRes + strRight;
    }

    // Any special cases have been handled, we can make final calculation
    return eval(str);
  }

  Calculator.prototype = {
    /**
     * Add input to calculation string.
     * Input is filtered to keep only relevant characters: any number, +, -, /, *, ^, .
     *
     * @param {mixed} input Can be a string or a number. Converted to string in any case
     */
    addInput: function(input) {
      this.currentCalc += String(input)
        .replace(/[^0-9\+\/\-\*,\.\(\)\^]/g,'')
        .replace(',','.');
    },

    /**
     * Delete last character in calculation string (backspace)
     */
    suppr: function() {
      this.currentCalc = this.currentCalc.substring(0, this.currentCalc.length - 1);
    },

    /**
     * Clear calculation string
     */
    clear: function() {
      this.currentCalc = '';
    },

    /**
     * Return current calculation string
     * @return {string}
     */
    getCurrentCalc: function() {
      return this.currentCalc;
    },

    /**
     * Retrieve result of current calculation string
     * @return {Number} Result of calculation
     * @throws {Error} If malformed expression
     */
    getResult: function() {
      try {
        if(this.currentCalc) {
          // Prepare string for calculation
          this.currentCalc = this.currentCalc.replace(/([\d\)]\()/g, (match, $1) => $1[0] + '*' + $1[1]);

          // Make calculation
          let res = solveStr(this.currentCalc);

          return res;
        }
      }
      catch(err) {
        throw new Error(err);
      }
    }
  };

  exports.Calculator = Calculator;
})(this);