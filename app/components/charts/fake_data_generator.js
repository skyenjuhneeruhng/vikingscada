export const rnd = function(min, max) {
  return (Math.random() * (max - min)) + min;
};

export const genRndData = function(min, max, len) {
  const values = [];
  for (let i = 0; i < len; i += 1) {
    values.push({ x: i.toString(), y: rnd(min, max) });
  }
  return values;
};

export const genNextRnd = function(cur, min, max) {
  const len = cur.length;
  const newValues = cur.slice();
  for (let i = 0; i < len - 1; i += 1) {
    newValues[i].y = cur[i + 1].y;
  }
  newValues[len - 1].y = rnd(min, max);
  return newValues;
};
