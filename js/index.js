/**
 * This is the function to draw the box
 * based on the position, color, width and height
 */
function getBox(boxColor, startX, startY, width, height, text) {
  ctx.fillStyle = boxColor;
  ctx.fillRect(startX + margin, startY + margin, width, height);

  if (text != undefined) {
    ctx.fillStyle = textColor; // Set the text color
    ctx.font = textFont; // Set the font size and family
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // TODO check for other values
    ctx.fillText(text, startX + width / 2, startY + height / 2); // Specify
  }
}

/**
 *
 * this is function to display total calculator
 * iterate though the matrix and and displxxy the boxes using get box
 *
 */

function displayCalculator() {
  displayControls();
  let currentX = 0;
  let currentY = 300;
  for (let i = 0; i < matrix.length; i++) {
    let row = matrix[i];
    for (j = 0; j < row.length; j++) {
      let color = getBoxColor(i, j, row.length);
      let boxWidth =
        j == 0 && i == matrix.length - 1
          ? normalboxSize * 3 + 2 * margin
          : normalboxSize;
      getBox(color, currentX, currentY, boxWidth, normalboxSize, matrix[i][j]);
      currentX += margin + boxWidth;
    }
    currentX = 0;
    currentY += margin + normalboxSize;
  }
}
/**
 *
 * This function is to disply the controls
 * -red button - to close
 * -yellow button - to minimize
 * - green button - to maximize
 *
 */
function displayControls() {
  ctx.beginPath();
  ctx.arc(circle1X, CircleY, circleRadius, 0, Math.PI * 2, true);
  ctx.fillStyle = closeColor;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(circle2X, CircleY, circleRadius, 0, Math.PI * 2, true);
  ctx.fillStyle = minimizeColor;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(circle3X, CircleY, circleRadius, 0, Math.PI * 2, true);
  ctx.fillStyle = maximizeColor;
  ctx.fill();
}
function getBoxColor(i, j, rowLength) {
  if (j == rowLength - 1) return orangeColor;
  if (i == 0) return lightGrayColor;
  return greyColor;
}
displayCalculator();
