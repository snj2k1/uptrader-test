export const getRandomInt = () => {
  const min = 0;
  const max = 1000000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
