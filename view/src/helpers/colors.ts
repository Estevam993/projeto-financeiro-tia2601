function hslToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);

  const f = (n: number) => {
    const color = l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);

    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}

function generateColors(amount: number): string[] {
  return Array.from({ length: amount }, (_, i) => {
    const hue = (i * 137.508) % 360

    return hslToHex(hue, 70, 50);
  });
}

const colors = generateColors(20);

export default colors;