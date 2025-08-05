export const toCaptalizie = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .filter((word) => word)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
