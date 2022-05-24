export type RGBAObj = { r: number; g: number; b: number; a: number };

export const hex2rgba = (hex: any, a = 1) => {
  const [r, g, b] = hex.match(/\w\w/g)?.map((x: any) => parseInt(x, 16));
  return { r, g, b, a };
};

export const rgb2hex = (r: number, g: number, b: number) => {
  let _r = r.toString(16),
    _g = g.toString(16),
    _b = b.toString(16);

  if (_r.length == 1) _r = `0${_r}`;
  if (_g.length == 1) _g = `0${_g}`;
  if (_b.length == 1) _b = `0${_b}`;
  return `#${_r}${_g}${_b}`
}

export const fmtRgba = (c: RGBAObj) =>
  `rgba(${c.r},${c.g},${c.b},${c.a || 1})`;

export const rgba2obj = (c: string) => {
  const a = c.match(/rgba\((.*)\)/)?.[1]?.split(',');
  return { r: Number(a?.[0]), g: Number(a?.[1]), b: Number(a?.[2]), a: Number(a?.[3]) };
}

export const setCSS = (key: string, val: any) => {
  document.body.style.setProperty(`--omb-${key}`, val);
}