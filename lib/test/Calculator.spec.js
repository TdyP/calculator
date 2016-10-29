describe('Calculator', function() {
  var calculator;

  beforeEach(function() {
    calculator = new Calculator();
  });

  describe('Input', function() {
    it('should add input to current calculation', function() {
      calculator.addInput(123);
      expect(calculator.getCurrentCalc()).to.be.a('string');
      expect(calculator.getCurrentCalc()).to.equal('123');
      calculator.addInput(456);
      expect(calculator.getCurrentCalc()).to.equal('123456');
    });

    it('should filter input', function() {
      calculator.addInput('a(123/12b&#)A*4+6-1');
      expect(calculator.getCurrentCalc()).to.equal('(123/12)*4+6-1');
    });

    it('should replace , by .', function() {
      calculator.addInput('1,25');
      expect(calculator.getCurrentCalc()).to.equal('1.25');
    });

    it('should clear input', function() {
      calculator.addInput('123456');
      calculator.clear();
      expect(calculator.getCurrentCalc()).to.equal('');
    });

    it('should suppr last input', function() {
      calculator.addInput('123456');
      calculator.suppr();
      expect(calculator.getCurrentCalc()).to.equal('12345');
    });
  });

  describe('Result', function() {
    it('should return a number', function() {
      calculator.addInput('1+1');
      let res = calculator.getResult();
      expect(res).to.be.a('number');
    });

    it('should add', function() {
      calculator.addInput('1+1');
      expect(calculator.getResult()).to.equal(2);
    });

    it('should substract', function() {
      calculator.addInput('5-3');
      expect(calculator.getResult()).to.equal(2);
    });

    it('should multiply', function() {
      calculator.addInput('21*2');
      expect(calculator.getResult()).to.equal(42);
    });

    it('should divide', function() {
      calculator.addInput('84/2');
      expect(calculator.getResult()).to.equal(42);
    });

    it('should handle parenthesis', function() {
      calculator.addInput('(2+3)*4');
      expect(calculator.getResult()).to.equal(20);
      calculator.clear();

      calculator.addInput('(2+(3*2))*4');
      expect(calculator.getResult()).to.equal(32);
      calculator.clear();

      calculator.addInput('(2+3)*(4-1)');
      expect(calculator.getResult()).to.equal(15);
      calculator.clear();

      calculator.addInput('(2+(3*(4*(2-5))))/(4-2)');
      expect(calculator.getResult()).to.equal(-17);
      calculator.clear();

      calculator.addInput('(2+3)*(4-1)/3');
      expect(calculator.getResult()).to.equal(5);
      calculator.clear();
    });

    it('should multiply stuck parenthesis', function() {
      calculator.addInput('(2+3)(2+2)');
      expect(calculator.getResult()).to.equal(20);
      calculator.clear();

      calculator.addInput('4(2+2)');
      expect(calculator.getResult()).to.equal(16);
      calculator.clear();
    });


    it('should handle exponents', function() {
      calculator.addInput('5^2');
      expect(calculator.getResult()).to.equal(25);
      calculator.clear();

      calculator.addInput('200000+4^2');
      expect(calculator.getResult()).to.equal(200016);
      calculator.clear();

      calculator.addInput('200000+4^2+2^3');
      expect(calculator.getResult()).to.equal(200024);
      calculator.clear();
    });

    it('should handle multiple operands', function() {
      calculator.addInput('(123/12)*4+(6-5)*2+2^3');
      expect(calculator.getResult()).to.equal(51);
      calculator.clear();

      calculator.addInput('100/(2+8)+5');
      expect(calculator.getResult()).to.equal(15);
      calculator.clear();
    });

    it('should handle float input', function() {
      calculator.addInput('1.25 * 4');
      expect(calculator.getResult()).to.equal(5);
      calculator.clear();

      calculator.addInput('1,25 * 4');
      expect(calculator.getResult()).to.equal(5);
      calculator.clear();
    });

    it('should handle float result', function() {
      calculator.addInput('1/3');
      let res = calculator.getResult();
      expect(res).to.equal(0.3333333333333333);
      calculator.clear();
    });

    it('should throw if input malformed', function() {
      calculator.addInput('12/*4');
      expect(calculator.getResult.bind(calculator)).to.throwError();
    });
  });
});
