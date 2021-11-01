"use strict";
window.onload = () => {
  // selectors & variables
  let currentGridSize = 100;
  let penColor = "";
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

  // disable drag behaviour
  window.ondragstart = function () {
    return false;
  };

  // HEXtoRGB function
  const hexToRGB = h => {
    let r = 0;
    let g = 0;
    let b = 0;
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
    return "rgb(" + +r + "," + +g + "," + +b + ")";
  };

  // Random color for rainbow
  const randomColor = () => {
    return Math.floor(Math.random() * 255) + 1;
  };

  // addEventListeners function
  const eventListeners = currentGridSize => {
    for (let i = 1; i <= currentGridSize; i++) {
      window["cell" + i].addEventListener("mouseover", e => {
        if (e.buttons === 1) {
          // Color Picker
          if (btnPen.classList.contains("btn-active")) {
            window["cell" + i].style.backgroundColor = penColor;
          }
          // Lighten
          else if (btnLighten.classList.contains("btn-active")) {
            const input = e["srcElement"]["style"]["backgroundColor"];
            let [r, g, b] = input.split(",");
            r = r.split("(");
            r = Number(r[1]);
            g = Number(g);
            b = Number(b.substring(0, b.length - 1));
            r += 20;
            g += 20;
            b += 20;
            window["cell" + i].style.backgroundColor = `rgb(${r},${g},${b}`;
          }
          // Darken
          else if (btnDarken.classList.contains("btn-active")) {
            const input = e["srcElement"]["style"]["backgroundColor"];
            let [r, g, b] = input.split(",");
            r = r.split("(");
            r = Number(r[1]);
            g = Number(g);
            b = Number(b.substring(0, b.length - 1));
            r -= 20;
            g -= 20;
            b -= 20;
            window["cell" + i].style.backgroundColor = `rgb(${r},${g},${b}`;
          }
          // Rainbow
          else if (btnRainbow.classList.contains("btn-active")) {
            window[
              "cell" + i
            ].style.backgroundColor = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
          } else window["cell" + i].style.backgroundColor = "rgb(0, 0, 0)";
        }
      });
      window["cell" + i].addEventListener("mousedown", e => {
        // Color Picker
        if (btnPen.classList.contains("btn-active")) {
          window["cell" + i].style.backgroundColor = penColor;
        }
        // Lighten
        else if (btnLighten.classList.contains("btn-active")) {
          const input = e["srcElement"]["style"]["backgroundColor"];
          let [r, g, b] = input.split(",");
          r = r.split("(");
          r = Number(r[1]);
          g = Number(g);
          b = Number(b.substring(0, b.length - 1));
          r += 20;
          g += 20;
          b += 20;
          window["cell" + i].style.backgroundColor = `rgb(${r},${g},${b}`;
        }
        // Darken
        else if (btnDarken.classList.contains("btn-active")) {
          const input = e["srcElement"]["style"]["backgroundColor"];
          let [r, g, b] = input.split(",");
          r = r.split("(");
          r = Number(r[1]);
          g = Number(g);
          b = Number(b.substring(0, b.length - 1));
          r -= 20;
          g -= 20;
          b -= 20;
          window["cell" + i].style.backgroundColor = `rgb(${r},${g},${b}`;
        }
        // Rainbow
        else if (btnRainbow.classList.contains("btn-active")) {
          window[
            "cell" + i
          ].style.backgroundColor = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
        } else window["cell" + i].style.backgroundColor = "rgb(0, 0, 0)";
      });
    }
  };

  // div-creation function
  const divCreate = sideLength => {
    for (let i = 1; i <= sideLength; i++) {
      window["cell" + i] = document.createElement("div");
      // window["cell" + i].classList.add("cell");
      window["cell" + i].classList.add("cell" + i);
      window["cell" + i].classList.add("grid-visible");
      window["cell" + i].style.backgroundColor = "rgb(255,255,255)";
      gridContainer.appendChild(window["cell" + i]);
    }
    // add event-listeners for mouse-over (requires mouse1 down = true) and mouse-down
    eventListeners(currentGridSize);
  };

  // div-removal function
  const divRemove = () => {
    while (gridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }
  };

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
    penColor = hexToRGB(pen.value);
  });

  pen.addEventListener("input", () => {
    btnPen.classList.add("btn-active");
    btnLighten.classList.remove("btn-active");
    btnDarken.classList.remove("btn-active");
    btnRainbow.classList.remove("btn-active");
    penColor = hexToRGB(pen.value);
  });

  // Lighten btn
  btnLighten.addEventListener("click", () => {
    btnPen.classList.remove("btn-active");
    btnLighten.classList.add("btn-active");
    btnDarken.classList.remove("btn-active");
    btnRainbow.classList.remove("btn-active");
  });

  // Darken btn
  btnDarken.addEventListener("click", () => {
    btnPen.classList.remove("btn-active");
    btnLighten.classList.remove("btn-active");
    btnDarken.classList.add("btn-active");
    btnRainbow.classList.remove("btn-active");
  });

  // Rainbow btn
  btnRainbow.addEventListener("click", () => {
    btnPen.classList.remove("btn-active");
    btnLighten.classList.remove("btn-active");
    btnDarken.classList.remove("btn-active");
    btnRainbow.classList.add("btn-active");
  });
};
