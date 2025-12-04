const pairIsNotPartOfLarger = (counts) =>
  Object.values(counts).some((count) => count === 2);

const hasRepeatedChar = (input) => {
  const numberStr = String(input);
  const object = {};
  let count = 1;

  for (let index = 0; index < numberStr.length; index++) {
    if (numberStr[index] === numberStr[index + 1]) {
      count++;
    } else {
      const char = numberStr[index];
      if (!object[char] || object[char] < count) {
        object[char] = count;
      }
      count = 1;
    }
  }

  return pairIsNotPartOfLarger(object);
};

const isIncreasing = (input) => {
  const number = String(input);
  for (let index = 0; index < number.length - 1; index++) {
    if (number[index] > number[index + 1]) return false;
  }
  return true;
};

export const passwordCombination = (input) => {
  const range = input.split("-");
  const [start, end] = [...range];
  let count = 0;

  for (let number = +start; number <= +end; number++) {
    const valid = hasRepeatedChar(number) && isIncreasing(number);
    if (valid) {
      count++;
    }
  }
  return count;
};
