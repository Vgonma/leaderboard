const sortHighScore = (array) => {
  const sortedArray = array;
  for (let i = 0; i < sortedArray.length - 1; i += 1) {
    for (let j = 0; j < sortedArray.length - i - 1; j += 1) {
      if (parseInt(sortedArray[j].score, 10) > parseInt(sortedArray[j + 1].score, 10)) {
        const temp = sortedArray[j];
        sortedArray[j] = sortedArray[j + 1];
        sortedArray[j + 1] = temp;
      }
    }
  }
  return sortedArray;
};

module.exports = sortHighScore;
