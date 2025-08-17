'use strict'

import { fonts } from '../data/fontsData.js';

const renderUI = function () {
  const fontsContainer = document.getElementById('fonts-container');

  fonts.forEach(font => {
    const html = `
      <div class="font-box">
        <div class="fonts general-flex horizontal-gap-lg">
          <span class="font-name">${font.fontName}</span>
          <span class="font-type">${font.type}</span>
        </div>

        <div class="font-sentence-container">
          <p class="font-sentence" style="font-family: ${font.fontName};">
            The quick brown fox jumps over the lazy dog
          </p>
        </div>

        <a
          href="https://fonts.google.com/?query=${font.fontName}"
          target="_blank"
          class="font-link"
        >
          <span>Get Font</span>
          <span>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </span>
        </a>
      </div>
    `;

    fontsContainer.insertAdjacentHTML('beforeend', html);
  });
};

renderUI();