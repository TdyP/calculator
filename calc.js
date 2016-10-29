'use strict';

(function() {
  var calculator = new Calculator();

  document.addEventListener('DOMContentLoaded', () => {
    let resElem = document.getElementById('res');
    let inputElem = document.getElementById('input');

    //////////////////
    // Click on pad //
    //////////////////
    function handleInput(input) {
      if(input === 'Enter') {
        try {
          let res = calculator.getResult();
          if(res) {
            resElem.innerHTML = res;
          }
        }
        catch(err) {
          resElem.innerHTML = 'Error';
        }
      }
      else {
        calculator.addInput(input);
      }
    }

    for(let elem of document.getElementsByClassName('key')) {
      elem.addEventListener('click', event => {
        let rel = event.target.attributes.rel.value;

        if(rel === 'clear') {
          calculator.clear();
          resElem.innerHTML = '';
        }
        else if(rel === 'suppr') {
          calculator.suppr();
        }
        else {
          handleInput(event.target.attributes.rel.value);
        }

        inputElem.innerHTML = calculator.currentCalc;
      });
    }

    /////////////////////
    // Keyboard events //
    /////////////////////
    document.getElementsByTagName('body')[0].addEventListener('keypress', event => {
      handleInput(event.key);
      inputElem.innerHTML = calculator.currentCalc;
    });

    document.getElementsByTagName('body')[0].addEventListener('keydown', event => {
      if(event.key === 'Backspace') {
        calculator.suppr();
        inputElem.innerHTML = calculator.currentCalc;
      }
    });
  }, false);
}());
