'use strict'

export class CompareTwoColors {
  // Parse #rgb or #rrggbb -> {r,g,b}
  hexToRgb(hex) {
    let h = hex.replace('#', '').trim().toLowerCase();

    // expand shorthand
    if (h.length === 3)
      h = h.split('').map(ch => ch + ch).join('');

    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16)
    };
  }

  // sRGB channel (0..255) -> linear value for luminance calculations
  srgbToLinear(c) {
    const v = c / 255;

    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }

  // Accepts a hex string or an {r,g,b} object; returns luminance 0..1
  relativeLuminance(input) {
    let rgb = input;
    if (typeof input === 'string')
      rgb = this.hexToRgb(input);

    const R = this.srgbToLinear(rgb.r);
    const G = this.srgbToLinear(rgb.g);
    const B = this.srgbToLinear(rgb.b);

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  // Return true if secondHex is darker (has lower luminance) than firstHex (midpoint)
  checkMidpoint(firstHex, secondHex) {
    const Lfirst = this.relativeLuminance(firstHex);
    const Lsecond = this.relativeLuminance(secondHex);

    return Lsecond < Lfirst;
  }
};

export const addClass = function (obj, targetClass) {
  obj.classList.add(targetClass);
};

export const removeClass = function (obj, targetClass) {
  obj.classList.remove(targetClass);
};

export const modFun = function (index, val, mod) {
  const finalVal = index + val;
  return ((finalVal % mod) + mod) % mod;
};