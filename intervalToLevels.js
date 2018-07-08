// const secondsToString = s => {
//   const secondsOfYear = 60 * 60 * 24 * 365;
//   const secondsOfDay = 60 * 60 * 24;
//   const secondsOfHour = 60 * 60;
//   const secondsOfMinute = 60;
//
//   let y = ~~(s / secondsOfYear);
//   s %= secondsOfYear;
//   let d = ~~(s / secondsOfDay);
//   s %= secondsOfDay;
//   let h = ~~(s / secondsOfHour);
//   s %= secondsOfHour;
//   let m = ~~(s / secondsOfMinute);
//   s = s % secondsOfMinute;
//
//   y = (y > 0 ? (y + 'y ') : '');
//   d = (d > 0 ? (d + 'd ') : '');
//   h = (h > 0 ? (h + 'h ') : '');
//   m = (m > 0 ? (m + 'm ') : '');
//   s = (s > 0 ? (s + 's ') : '');
//
//   return y + d + h + m + s;
// }

const intervalToLevels = (interval, levels) => {
  let s = levels.scale
      || (levels.units && Array(levels.units.length).fill().map((d,i) => Math.pow(10,i)).reverse())
      || [1];
  let u = levels.units
      || (levels.scale && Array(levels.scale.length).fill().map((d,i) => String.fromCharCode(65 + i)))
      || ['A'];

  if (s.length !== u.length)
    return 'ERROR: lengths of scale and units are different!';

  const cbFun = (d, c) => {
    let bb = d[1] % c[0],
      aa = (d[1] - bb) / c[0];
    aa = aa > 0 ? aa + c[1] : '';

    return [d[0] + aa, bb];
  };

  let rslt = s.map((d, i, a) => a.slice(i).reduce((d, c) => d * c))
    .map((d, i) => ([d, u[i]]))
    .reduce(cbFun, ['', interval]);
  return rslt[0];
};

const TimeLevels = {
  scale: [365, 24, 60, 60, 1],
  units: ['y ', 'd ', 'h ', 'm ', 's ']
};
const secondsToString = interval => intervalToLevels(interval, TimeLevels);

const LengthLevels = {
  scale: [1760, 3, 12, 1],
  units: ['mi ', 'yd ', 'ft ', 'in ']
};
const inchesToString = interval => intervalToLevels(interval, LengthLevels);

const LiquidsLevels = {
  scale: [4, 2, 2, 8, 1],
  units: ['gal ', 'qt ', 'pt ', 'cup ', 'fl_oz ']
};
const ouncesToString = interval => intervalToLevels(interval, LiquidsLevels);
