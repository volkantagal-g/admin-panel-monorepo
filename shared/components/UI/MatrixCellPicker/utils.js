export const convertTwoDimensionalArrToObj = twoDimensionalArr => {
  // Simply convert to two-dimensional array, with 1 index keys;
  // [[0,1],[2,1],[3,1],[1,3]] => {1:[0,2,3],3:[1]}
  // TODO: Can simplify with arr.reduce ?
  let matrixDataColOrientedObj = {};
  twoDimensionalArr.forEach(cellCoordinates => {
    if (matrixDataColOrientedObj[cellCoordinates[1]]) {
      matrixDataColOrientedObj = { ...matrixDataColOrientedObj, [cellCoordinates[1]]: [...matrixDataColOrientedObj[cellCoordinates[1]], cellCoordinates[0]] };
    }
    else {
      matrixDataColOrientedObj = { ...matrixDataColOrientedObj, [cellCoordinates[1]]: [cellCoordinates[0]] };
    }
  });
  return matrixDataColOrientedObj;
};
