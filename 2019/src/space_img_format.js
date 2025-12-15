import { chunk } from "@std/collections/chunk";

const distributeIntoLayers = (width, height, values) =>
  chunk(values, width * height);

const fewestZero = (layers) => {
  let minZeroCount = Infinity;
  let layerWithFewestZero = 0;

  layers.forEach((row, rowIndex) => {
    const zeroCount = row.filter((num) => num === "0").length;
    if (zeroCount < minZeroCount) {
      minZeroCount = zeroCount;
      layerWithFewestZero = rowIndex;
    }
  });
  return layerWithFewestZero;
};

const frequencyOf = (layer) =>
  layer.reduce((acc, color) => {
    acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {});

const productOf1And2 = (layerValues) => layerValues["1"] * layerValues["2"];

const main = (input, width, height) => {
  const layers = distributeIntoLayers(width, height, input);
  const layerWithFewestZero = fewestZero(layers);
  const frequencyGrid = frequencyOf(layers[layerWithFewestZero]);
  return productOf1And2(frequencyGrid);
};

const input = Deno.readTextFileSync("./data/input_space_img_format.txt");

//part - 2
const getPixels = (layers) => {
  const len = layers[0].length;
  const result = [];
  for (let index = 0; index < len; index++) {
    for (const layer of layers) {
      const pixel = layer[index];
      if (pixel !== "2") {
        result.push(pixel === "0" ? "⬛️" : "⬜️");
        break;
      }
    }
  }
  return result;
};

const formGrid = (width, image) => {
  const row = chunk(image, width);
  return row.map((r) => r.join("")).join("\n");
};

const main2 = (input, width, height) => {
  const layers = distributeIntoLayers(width, height, input);
  const image = getPixels(layers);
  console.log(image);

  return formGrid(width, image);
};

const demo = [0, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 2, 0, 0, 0, 0].map(String);
console.log(main2(input, 25, 6));
