let buttons = [];
var expression = "";
var previousExpression = "";
var result = "";
initalseButtonProperties();
/**
 *
 * initalseButtonProperties is used to inialize the buttons
 * button ={
 * x:starting position x-coordinate,
 *  y: starting position y-coordinate,
 * width: width of the button,
 * height: height of the button,
 * value : value for action on the button
 * }
 *
 */
function initalseButtonProperties() {
  let tempX = 0;
  let tempY = 300;

  for (let i = 0; i < matrix.length; i++) {
    let row = matrix[i];
    for (j = 0; j < row.length; j++) {
      let boxWidth =
        j == 0 && i == matrix.length - 1
          ? normalboxSize * 3 + 2 * margin
          : normalboxSize;
      buttons.push({
        x: tempX,
        y: tempY,
        width: boxWidth,
        height: normalboxSize,
        value: matrix[i][j],
      });
      tempX += margin + boxWidth;
    }
    tempX = 0;
    tempY += margin + normalboxSize;
  }
}

/**
 *
 * Event listener for the clicks
 *
 */
canvas.addEventListener("click", function (event) {
  updateCalculator(event);
});

/**
 *
 * @param {EventListener} event
 *
 * Thus fuction will be called to update the calculator disply and value
 *
 */
function updateCalculator(event) {
  let clickedCharacter = getClickedCharacter(event);
  if (clickedCharacter == undefined) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  displayCalculator();
  console.log(clickedCharacter);
  if (clickedCharacter == "=") {
    isEqualsEnabled = true;
    previousExpression = expression;
    updateResult();
  } else if (clickedCharacter == "Back") {
    if (isEqualsEnabled) {
      expression = previousExpression;
      isEqualsEnabled = false;
    } else {
      expression = expression.slice(0, -1);
    }
    displayExpression(expression);
  } else {
    expression += clickedCharacter;
    displayExpression(expression);
  }
}
/**
 *
 * This method is called while implementing the "="
 *
 */
function updateResult() {
  let expStage = expression;
  try {
    result = new Function(`return ${expression}`)();
    expression = isNaN(result) ? "" : result + "";
  } catch (e) {
    result = "Invalid Expression";
    expression = "";
  }
  ctx.fillStyle = textColor; // Set the text color
  ctx.font = "35px Arial";
  ctx.textAlign = "right";
  ctx.fillText(expStage, canvas.width - 10, 165); // Specify
  displayExpression(result);
}

function displayExpression(expression) {
  ctx.fillStyle = textColor;
  ctx.font = textFont;
  ctx.textAlign = "right";
  ctx.fillText(expression, canvas.width - 10, 250);
}

/**
 *
 * @param {EventListener} event
 *
 * This method returns the action based on the click
 * based on the click coordinates we eget the x and y relative to the canvas
 *
 * @returns button.action
 *
 */
function getClickedCharacter(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  for (const button of buttons) {
    if (
      x >= button.x &&
      x < button.x + button.width &&
      y >= button.y &&
      y < button.y + button.height
    ) {
      //   console.log('Button clicked:', button.value); // Log the button value or update expression here
      return button.value;
      break;
    }
  }
}
