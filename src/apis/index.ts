export const getTypes = () =>
  fetch("https://pokeapi.co/api/v2/type?limit=100&offset=0");

export const getPokemons = ({limitParam, pageParam}: {limitParam: number, pageParam: number}) =>
  fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limitParam}&offset=${
      limitParam * +pageParam
    }`
  );
