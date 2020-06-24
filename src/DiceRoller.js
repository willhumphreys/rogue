export const rollDiceSpecified = (times, sides) => {
  return Math.floor(Math.random() * sides) * times;
};

export const rollDice = (rollsToMake) => {
  const parts = rollsToMake.split("d");

  const times = parts[0];
  const dice = parts[1];

  return rollDiceSpecified(times, dice);
};
