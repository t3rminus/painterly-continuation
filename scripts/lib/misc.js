export const titleCase = (str) =>
  str.toLowerCase().split(' ').map((word) => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ');

export const setPath = (obj, path, set) => {
  let start = obj;
  const segs = path.split('.');
  const last = segs.pop();
  segs.forEach((seg) => {
    if(!start[seg]) {
      start[seg] = {};
    }
    start = start[seg];
  });
  start[last] = set;
};