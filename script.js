"use strict";
// add flex-column to dom
const flexContainerColumn = document.createElement("div");
flexContainerColumn.classList.add("flex-container-column");
document.body.prepend(flexContainerColumn);
// add flex-row to column
const flexContainerRow = document.createElement("div");
flexContainerRow.classList.add("flex-container-row");
flexContainerColumn.prepend(flexContainerRow);
// add grid-reset button flex-row
const btnNewGrid = document.createElement("button");
flexContainerRow.prepend(btnNewGrid);
btnNewGrid.textContent = "New Grid?";
// add input field to flex-row
const gridSizeInput = document.createElement("input");
gridSizeInput.classList.add("grid-size-input");
gridSizeInput.placeholder = "Enter side length...";
flexContainerRow.appendChild(gridSizeInput);
// add gridContainer to flex-column -after- flex-row
const gridContainer = document.querySelector(".grid-container");
flexContainerColumn.appendChild(gridContainer);

// create vars+divs and attach to dom
for (let i = 1; i < 257; i++) {
  window["cell" + i] = document.createElement("div");
  window["cell" + i].classList.add("cell");
  window["cell" + i].classList.add("cell" + i);
  gridContainer.appendChild(window["cell" + i]);
  // add mouseover listener for div color change
  window["cell" + i].addEventListener("mouseover", () => {
    window["cell" + i].style.backgroundColor = "#000";
  });
}
// manual first-grid layout
gridContainer.style.grid = "repeat(16, 1fr) / repeat(16,1fr)";

btnNewGrid.addEventListener("click", () => {
  // remove previous grid divs
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
  // ask for new grid length then loop to create row/column value; sqr result = total divs to pass to next loop;
  const gridLength = Number(gridSizeInput.value);
  if (gridLength > 100) {
    gridSizeInput.value = "";
    gridSizeInput.placeholder = "Size too large.";
  } else {
    // new grid creation loop
    const gridNewSize = Math.pow(gridLength, 2);
    for (let i = 1; i <= gridNewSize; i++) {
      window["cell" + i] = document.createElement("div");
      window["cell" + i].classList.add("cell");
      window["cell" + i].classList.add("cell" + i);
      gridContainer.appendChild(window["cell" + i]);
      window["cell" + i].addEventListener("mouseover", () => {
        window["cell" + i].style.backgroundColor = "#000";
      });
    }
    // after loop, use initial user specified grid-length for row/column value
    gridContainer.style.grid = `${"repeat(" + gridLength + ",1fr)"} / ${
      "repeat(" + gridLength + ",1fr)"
    }`;
  }
});
