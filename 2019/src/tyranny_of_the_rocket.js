const fuelFor = (mass) => Math.floor(mass / 3) - 2;

export const part1 = (input) =>
  input.split("\n").reduce((sum, mass) => sum + fuelFor(+mass), 0);

export const part2 = (input) =>
  input.split("\n").reduce((totalFuel, mass) => {
    let fuel = fuelFor(+mass);
    let extraFuel = fuelFor(fuel);
    while (extraFuel > 0) {
      fuel += extraFuel;
      extraFuel = fuelFor(extraFuel);
    }
    return totalFuel + fuel;
  }, 0);
