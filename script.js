"use strict";
window.onload = () => {
  // disable drag behaviour
  window.ondragstart = function () {
    return false;
  };

  // selectors & variables
  let currentGridSize = 100;
  let divChangeEffect = "#000";
  const btnGrid = document.getElementById("btn-grid");
  const btn10x = document.getElementById("btn-10x");
  const btn50x = document.getElementById("btn-50x");
  const btn100x = document.getElementById("btn-100x");
  const btnPen = document.getElementById("btn-pen");
  const pen = document.getElementById("pen");
  const btnLighten = document.getElementById("btn-lighten");
  const btnDarken = document.getElementById("btn-darken");
  const btnRainbow = document.getElementById("btn-rainbow");
  const gridContainer = document.getElementById("grid-container");

  // addEventListeners function
  const eventListeners = (divAmnt, divChange) => {
    window["cell" + divAmnt].addEventListener("mouseover", e => {
      if (e.buttons === 1)
        window["cell" + divAmnt].style.backgroundColor = divChange;
    });
    window["cell" + divAmnt].addEventListener("mousedown", e => {
      window["cell" + divAmnt].style.backgroundColor = divChange;
    });
  };

  // div-creation function
  const divCreate = sideLength => {
    for (let i = 1; i <= sideLength; i++) {
      window["cell" + i] = document.createElement("div");
      // window["cell" + i].classList.add("cell");
      // window["cell" + i].classList.add("cell" + i);
      window["cell" + i].classList.add("grid-visible");
      gridContainer.appendChild(window["cell" + i]);
      // add event-listeners for mouse-over (requires mouse1 down = true) and mouse-down
      eventListeners(i, divChangeEffect);
    }
  };

  // div-removal function
  const divRemove = () => {
    while (gridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }
  };

  // Change Eventlisteners function
  // ------------------------------------------------------------------------
  const changeEventListeners = (divAmnt, divChange) => {
    console.log(divAmnt);
    console.log(divChange);
    for (let i = 1; i <= divAmnt; i++) {
      window["cell" + i].addEventListener("mouseover", e => {
        if (e.buttons === 1)
          window["cell" + i].style.backgroundColor = divChange;
      });
      window["cell" + i].addEventListener("mousedown", e => {
        window["cell" + i].style.backgroundColor = divChange;
      });
    }
  };
  // ------------------------------------------------------------------------

  // create first grid & manual layout
  divCreate(currentGridSize);
  gridContainer.style.grid = "repeat(10, 1fr) / repeat(10,1fr)";

  // Grid btns
  btnGrid.addEventListener("click", () => {
    btnGrid.classList.toggle("btn-active");
    for (let i = 1; i <= currentGridSize; i++) {
      window["cell" + i].classList.toggle("grid-invisible");
    }
  });

  btn10x.addEventListener("click", () => {
    currentGridSize = 100;
    btnGrid.classList.add("btn-active");
    btn10x.classList.add("btn-active");
    btn50x.classList.remove("btn-active");
    btn100x.classList.remove("btn-active");
    divRemove();
    divCreate(currentGridSize);
    gridContainer.style.grid = "repeat(10, 1fr) / repeat(10,1fr)";
  });

  btn50x.addEventListener("click", () => {
    currentGridSize = 2500;
    btnGrid.classList.add("btn-active");
    btn10x.classList.remove("btn-active");
    btn50x.classList.add("btn-active");
    btn100x.classList.remove("btn-active");
    divRemove();
    divCreate(currentGridSize);
    gridContainer.style.grid = "repeat(50, 1fr) / repeat(50,1fr)";
  });

  btn100x.addEventListener("click", () => {
    currentGridSize = 10000;
    btnGrid.classList.add("btn-active");
    btn10x.classList.remove("btn-active");
    btn50x.classList.remove("btn-active");
    btn100x.classList.add("btn-active");
    divRemove();
    divCreate(currentGridSize);
    gridContainer.style.grid = "repeat(100, 1fr) / repeat(100,1fr)";
  });

  btnPen.addEventListener("click", () => {
    btnPen.classList.add("btn-active");
    btnLighten.classList.remove("btn-active");
    btnDarken.classList.remove("btn-active");
    btnRainbow.classList.remove("btn-active");
    console.log(pen.value);
    changeEventListeners(currentGridSize, pen.value);
  });

  // --- Future reference for Darken / Light solution ---
  //   a {
  //     /* a nice, modern blue for links */
  //     color: #118bee;
  // }
  // a:active {
  //     /* Darken on click by 15% (down to 85%) */
  //     filter: brightness(0.85);
  // }

  btnLighten.addEventListener("click", () => {
    btnPen.classList.remove("btn-active");
    btnLighten.classList.add("btn-active");
    btnDarken.classList.remove("btn-active");
    btnRainbow.classList.remove("btn-active");
  });

  btnDarken.addEventListener("click", () => {
    btnPen.classList.remove("btn-active");
    btnLighten.classList.remove("btn-active");
    btnDarken.classList.add("btn-active");
    btnRainbow.classList.remove("btn-active");
    changeEventListeners();
  });

  // Rainbow btn

  btnRainbow.addEventListener("click", () => {
    btnPen.classList.remove("btn-active");
    btnLighten.classList.remove("btn-active");
    btnDarken.classList.remove("btn-active");
    btnRainbow.classList.add("btn-active");
    changeEventListeners(currentGridSize, test());
  });
};
