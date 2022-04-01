import { fontColors } from '../pages/_app';

interface RGB {
  r: number
  g: number
  b: number
}

function rgbFromColor(color: string): RGB {
  if (color.match(/^rgb/i)) {
    const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3])
    };
  }
  else {
    const value = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
    return {
      r: value >> 16,
      g: value >> 8 & 255,
      b: value & 255
    };
  }
}

function hspFromRgb(rgb: RGB): number {
  const { r, g, b } = rgb;
  return Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
}

function lightOrDark(color: string): boolean {
  const rgb = rgbFromColor(color);
  const hsp = hspFromRgb(rgb);
  return hsp > 127.5; // returns true if light color, false if dark color.
}

function fgFromBg(backgroundColor: string) {
  // Returns black if the given bgColor is light, white if the given bgColor is dark.
  const { light, dark } = fontColors;
  return lightOrDark(backgroundColor) ? dark : light;
}

export { fgFromBg };
export default lightOrDark;