const array = [[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [0, 1, 2]]];
// console.log(array.map((el) => el.join(",")).join("\n"));

//pixels : wide: 3, tall: 2

const formPixel = (width, height) =>
  Array.from(
    { length: height },
    (x) =>
      Array.from({ length: height }, (x) =>
        Array.from({ length: width }, (x) => "1")),
  );

const pixelGrid = formPixel(3, 2);

const fillPixel = (pixelGrid, values) => {
  let valueIndex = -1;
  const result = pixelGrid.map((pixelRow) =>
    pixelRow.map((row) =>
      row.map((pixel) => {
        valueIndex++;
        return values[valueIndex];
      })
    )
  );
  return result;
};

console.log(fillPixel(pixelGrid, [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2]));
