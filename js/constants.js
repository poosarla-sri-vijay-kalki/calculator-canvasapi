// get the canvas element
const canvas = document.getElementById("calculator");
// this is the matrix for display the calculator
const matrix = [
  [, , , "%", "/"],
  ["(", "7", "8", "9", "*"],
  [")", "4", "5", "6", "-"],
  ["Back", "1", "2", "3", "+"],
  ["0", ".", "="],
];
//  this the context from the canvas
const ctx = canvas.getContext("2d");
// this is the box width
const normalboxSize = 150;
// This is the work area to display the response
const workAreaWidth = 300;

const circleRadius = 15;
const buttonOffset = 10;
const circle1X = circleRadius + buttonOffset;
const circle2X = circle1X + 2 * circleRadius + buttonOffset;
const circle3X = circle2X + 2 * circleRadius + buttonOffset;
const CircleY = circleRadius + buttonOffset;

// This is the margin in between buttons
const margin = 2;

// this the colors for the various buttons
const greyColor = "rgb(120,122,126)";
const lightGrayColor = "rgb(94,96,101)";
const orangeColor = "rgb(255,159,12)";
const closeColor = "rgb(255,95,88)";
const minimizeColor = "rgb(254,188,46)";
const maximizeColor = "rgb(41,200,63)";

// text Color
const textColor = "white";
const textFont = "bold 50px Arial";

var isEqualsEnabled = false;
