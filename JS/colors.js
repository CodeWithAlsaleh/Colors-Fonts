'use strict'

import { colorPalettes, colorElements } from '../data/colorsData.js';
import { CompareTwoColors, addClass, removeClass, modFun } from './general.js';

const navBar = document.querySelector('.navbar');

class App {
  #index = 0;
  #mp = new Map();

  constructor() {
    this.initializeElements();
    this.attachEventListeners();
    this.renderUI();
  }

  initializeElements() {
    colorElements.range = 20;
    colorElements.colorMidpoint = '#808080';
    colorElements.colorsContainer = document.getElementById('colors-container');
    colorElements.arrowLeft = document.querySelector('.arrow-left');
    colorElements.arrowRight = document.querySelector('.arrow-right');
    colorElements.paginationList = document.querySelector('.pagination-list');
  }

  attachEventListeners() {
    colorElements.colorsContainer.addEventListener('click', this.handleColorSelection.bind(this));

    colorElements.paginationList.addEventListener('click', this.handleChangePages.bind(this));

    colorElements.arrowRight.addEventListener('click', () => {
      this.#index = modFun(this.#index, 1, 3);
      this.handleArrowChangePages();
    });

    colorElements.arrowLeft.addEventListener('click', () => {
      this.#index = modFun(this.#index, -1, 3);
      this.handleArrowChangePages();
    });
  }

  handleColorSelection(e) {
    const hexCode = e.target.dataset.hexCode;
    const eleIcon = e.target.children[0];

    if (hexCode) {
      // To check if the user clicks more than once on the color
      if (this.#mp.has(eleIcon)) {
        clearTimeout(this.#mp.get(eleIcon));
        this.#mp.delete(eleIcon);
      }

      const compareColors = new CompareTwoColors();
      if (compareColors.checkMidpoint(colorElements.colorMidpoint, hexCode)) {
        eleIcon.classList.add('white-icon');
      }

      eleIcon.classList.remove('hidden');

      const id = setTimeout(() => {
        eleIcon.classList.add('hidden');
      }, 1000);

      this.#mp.set(eleIcon, id);

      navigator.clipboard.writeText(hexCode);
    }
  }

  handleChangePages(e) {
    const ele = e.target.closest('.pagination-list-item');

    if (!ele) return;

    const activeList = document.querySelector('.active-list');
    this.renderActiveElements(activeList, ele, 'active-list');

    const activeEle = document.querySelector('.pagination-item-active');
    this.renderActiveElements(activeEle, ele.children[0], 'pagination-item-active');

    this.#index = +ele.dataset.index;
    navBar.scrollIntoView();
    this.renderUI();
  }

  handleArrowChangePages(e) {
    const ele = document.getElementById(`list-index-${this.#index}`);

    const activeList = document.querySelector('.active-list');
    this.renderActiveElements(activeList, ele, 'active-list');

    const activeEle = document.querySelector('.pagination-item-active');
    this.renderActiveElements(activeEle, ele.children[0], 'pagination-item-active');

    navBar.scrollIntoView();
    this.renderUI();
  }

  renderActiveElements(firstEle, secondEle, targetClass) {
    removeClass(firstEle, targetClass);
    addClass(secondEle, targetClass);
  }

  renderUI() {
    // Clear previous colorBoxes
    colorElements.colorsContainer.innerHTML = '';

    const startInd = (this.#index) * 20;
    const range = colorElements.range;

    for (let i = startInd; i < Math.min(startInd + range, colorPalettes.length); ++i) {
      const color = colorPalettes[i];

      const html = `
        <div class="color-box">
          <div class="colors grid-3-cl">
            <span class="first-color-tint box" style="background-color: ${color.firstColor[0]};" data-hex-code="${color.firstColor[0]}">
              <ion-icon class="icon hidden" name="checkmark-done-outline"></ion-icon>
            </span>
            <span class="first-color-main box" style="background-color: ${color.firstColor[1]};" data-hex-code="${color.firstColor[1]}">
              <ion-icon class="icon hidden" name="checkmark-done-outline"></ion-icon>
            </span>
            <span class="first-color-shade box" style="background-color: ${color.firstColor[2]};" data-hex-code="${color.firstColor[2]}">
              <ion-icon class="icon hidden" name="checkmark-done-outline"></ion-icon>
            </span>
            <span class="second-color-tint box" style="background-color: ${color.secondColor[0]};" data-hex-code="${color.secondColor[0]}">
              <ion-icon class="icon hidden" name="checkmark-done-outline"></ion-icon>
            </span>
            <span class="second-color-main box" style="background-color: ${color.secondColor[1]};" data-hex-code="${color.secondColor[1]}">
              <ion-icon class="icon hidden" name="checkmark-done-outline"></ion-icon>
            </span>
            <span class="second-color-shade box" style="background-color: ${color.secondColor[2]};" data-hex-code="${color.secondColor[2]}">
              <ion-icon class="icon hidden" name="checkmark-done-outline"></ion-icon>
            </span>
          </div>

          <div class="colors-name general-flex horizontal-padding-sm">
            <span class="first-color-name color-name ">${color.firstColorName}</span>
            <span class="second-color-name color-name">${color.secondColorName}</span>
          </div>
        </div>
      `;

      colorElements.colorsContainer.insertAdjacentHTML('beforeend', html);
    }
  }
};

const app = new App();