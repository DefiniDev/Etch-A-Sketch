"use strict";
// selectors
const btnNewGrid = document.querySelector("button");
const gridSizeInput = document.querySelector("input");
const gridContainer = document.getElementById("grid-container");

// div-creation function
const divCreate = sideLength => {
  for (let i = 1; i <= sideLength; i++) {
    window["cell" + i] = document.createElement("div");
    window["cell" + i].classList.add("cell");
    window["cell" + i].classList.add("cell" + i);
    gridContainer.appendChild(window["cell" + i]);
    // add mouseover listener for div color change
    window["cell" + i].addEventListener("mouseover", () => {
      window["cell" + i].style.backgroundColor = "#000";
    });
  }
};
// create first grid & manual layout
divCreate(256);
gridContainer.style.grid = "repeat(16, 1fr) / repeat(16,1fr)";

btnNewGrid.addEventListener("click", () => {
  // ask for new grid length to create row/column value; sqr result = total divs to pass grid create function

  const gridLength = Number(gridSizeInput.value);

  if (gridLength > 100) {
    gridSizeInput.value = "";
    gridSizeInput.placeholder = "Size too large.";
  } else if (gridLength === 0) {
    gridSizeInput.placeholder = "Please enter size...";
  } else {
    // remove previous grid divs
    while (gridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }
    // create new user-specific grid
    const gridNewSize = Math.pow(gridLength, 2);
    divCreate(gridNewSize);
    // use initial user specified grid-length for row/column value
    gridContainer.style.grid = `${"repeat(" + gridLength + ",1fr)"} / ${
      "repeat(" + gridLength + ",1fr)"
    }`;
  }
});
