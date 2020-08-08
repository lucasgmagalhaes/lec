document.getElementById("calc").onclick = function () {
  calculate();
};

function calculate() {
  const lines = parseBody();
  const lineFirstCopy = parseBody();

  const lineOneFirstValue = lines[0].valueNames[0].value * -1;
  const lineTwoFirstValue = lines[1].valueNames[0].value;

  Object.assign(lineFirstCopy, lines[0]);
  Object.assign(lineFirstCopy.valueNames, lines[0]);

  // Multiply lines
  multiplyInvertedLines(lines[0].valueNames, lineTwoFirstValue);
  lines[0].total = operate(lines[0].total, lineTwoFirstValue, "*");

  multiplyInvertedLines(lines[1].valueNames, lineOneFirstValue);
  lines[1].total = operate(lines[1].total, lineOneFirstValue, "*");

  // find current value for second variableName (common y)
  const currentY = lines[0].valueNames[1].value + lines[1].valueNames[1].value;
  const currentTotal = lines[0].total + lines[1].total;

  const y = currentTotal / currentY;

  const totalLineOne =
    lineFirstCopy[0].total - y * lineFirstCopy[0].valueNames[1].value;
  const x = totalLineOne / lineFirstCopy[0].valueNames[0].value;
  window.alert(`x: ${x} and y: ${y}`);
}

/**
 * 
 * @param {{
    value: any;
    name: any;
}[]} keys 
 * @param {number} multiplierValue 
 */
function multiplyInvertedLines(valueNames, multiplierValue) {
  for (const valueName of valueNames) {
    valueName.value = operate(multiplierValue, valueName.value, "*");
  }
}

function operate(value1, value2, operator) {
  if (operator === "+") return value1 + value2;
  if (operator === "-") return value1 - value2;
  if (operator === "*") return value1 * value2;
}

function parseBody() {
  const content = document.getElementById("bodyContent").value;
  const lines = content.split("\n");
  const objs = [];
  for (const line of lines) {
    const values = line.split(" ");
    const lineParsed = parseValueName(values);
    objs.push(lineParsed);
  }

  return objs;
}

function parseValueName(values) {
  let lineParsed = [];
  let operators = [];
  let total = 0;
  for (const lineValue of values) {
    if (lineValue !== "=") {
      if (isOperator(lineValue)) {
        operators.push(lineValue);
      } else if (isNaN(lineValue)) {
        let value = +lineValue.split("")[0];
        let name = lineValue.split("")[1];
        lineParsed.push({ value, name });
      } else {
        total = +lineValue;
      }
    }
  }

  return {
    valueNames: lineParsed,
    operators,
    total,
  };
}

/**
 *
 * @param {string} value
 */
function isOperator(value) {
  return value === "*" || value === "-" || value === "+";
}

function isNumber(value) {
  return isNaN();
}
