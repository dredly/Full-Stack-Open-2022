const uniqueByTitle = (a) => {
  let seen = new Set();
  return a.filter((item) => {
    let k = item.title;
    return seen.has(k) ? false : seen.add(k);
  });
};

export default uniqueByTitle;
