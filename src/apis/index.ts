export const getTypes = () =>
  fetch("https://pokeapi.co/api/v2/type").then((res) => res.json());
