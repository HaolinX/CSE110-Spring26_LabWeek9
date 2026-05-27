// Step 1: Setup
const form = document.querySelector('form');
// make it better for getButton readability
const errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));

function getButton(label) {
  return errorBtns.find(function (button) {
    return button.textContent.trim() === label;
  });
}
let timerStarted = false;

// Step 2: adding buttons for console testing
getButton('Console Log').addEventListener('click', function() {
  console.log('Console Log Demo');
});

getButton('Console Error').addEventListener('click', function () {
  console.error('Console Error Demo');
});

getButton('Console Count').addEventListener('click', function () {
  console.count('Count Button');
});

getButton('Console Warn').addEventListener('click', function () {
  console.warn('Console Warn Button');
});

getButton('Console Assert').addEventListener('click', function() {
  const number = 2;

  console.assert(number === 3, {
    number: number,
    errorMsg: 'The number does not equal 3'
  });
});

getButton('Console Clear').addEventListener('click', function () {
  console.clear();
});

getButton('Console Dir').addEventListener('click', function() {
  console.dir(getButton('Console Dir'));
});

getButton('Console dirxml').addEventListener('click', function() {
  console.dirxml(getButton('Console dirxml'));
});

getButton('Console Group Start').addEventListener('click', function() {
  console.group('console.group');
});

getButton('Console Group End').addEventListener('click', function() {
  console.groupEnd();
});

getButton('Console Table').addEventListener('click', function() {
  const classes = [
    { name: 'Software Engineering', num: 110 },
    { name: 'Programming Languages', num: 130 },
    { name: 'Advanced Software Engineering', num: 112 }
  ];

  console.table(classes);
});

getButton('Start Timer').addEventListener('click', function () {
  if (timerStarted) {
    console.warn('Timer is already running');
    return;
  }

  timerStarted = true;
  console.time('Timer Button');
});

getButton('End Timer').addEventListener('click', function () {
  if (!timerStarted) {
    console.warn('Timer has not started yet');
    return;
  }

  console.timeEnd('Timer Button');
  timerStarted = false;
});

getButton('Console Trace').addEventListener('click', handleTraceClick);
function handleTraceClick() {
  deep();
}

function deep() {
  deeper();
}

function deeper() {
  deepest();
}

function deepest() {
  console.trace('console.trace');
}


// Step 3: try / catch / finally
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const output = document.querySelector('output');
  const firstNum = document.querySelector('#first-num').value;
  const secondNum = document.querySelector('#second-num').value;
  const operator = document.querySelector('#operator').value;

  try {
    validateInputs(firstNum, secondNum, operator);
    const result = calculate(firstNum, secondNum, operator);
    output.textContent = result;
  
  
  } catch (error) {
    setTimeout(function () {
      throw error;
    }, 0);

  } finally {
  }
});


// Step 4: throw and custom errors
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateInputs(firstNum, secondNum, operator) {
  if (firstNum.trim() === '' || secondNum.trim() === '') {
    throw new ValidationError('input', 'Both fields are required.');
  }

  if (isNaN(firstNum) || isNaN(secondNum)) {
    throw new ValidationError('input', 'Both must be valid numbers.');
  }

  if (operator === '/' && Number(secondNum) === 0) {
    throw new ValidationError('second-num', 'Cannot divide by zero.');
  }
}

function calculate(firstNum, secondNum, operator) {
  const first = Number(firstNum);
  const second = Number(secondNum);

  if (operator === '+') {
    return first + second;
  }

  if (operator === '-') {
    return first - second;
  }

  if (operator === '*') {
    return first * second;
  }

  if (operator === '/') {
    return first / second;
  }
}


// Step 5: global error handler and tracking
window.onerror = function (message, source, line, column, error) {
  console.log('Sadly an error happened my friend');

  if (window.TrackJS) {
    TrackJS.track(error);
  }

  return false;
};

getButton('Trigger a Global Error').addEventListener('click', handleGlobalErrorClick);
function handleGlobalErrorClick() {
  boom();
}