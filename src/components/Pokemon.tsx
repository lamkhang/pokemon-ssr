import Image from "next/image";
import React from "react";
import { PokemonDetail, Result } from "src/types";

const Pokemon: React.FC<{ pokemon: Result }> = async ({ pokemon }) => {
  const resPokemonDetail = await fetch(pokemon.url);
  const pokemonDetail: PokemonDetail = await resPokemonDetail.json();

  return (
    <div className="flex flex-col items-center justify-between border border-gray-300 p-4 hover:shadow-md rounded-e-md">
      <div className="text-md">{pokemon.name}</div>
      <Image
        src={pokemonDetail.sprites.front_default}
        alt={pokemon.name}
        width={80}
        height={80}
        loading="lazy"
      />
      {/* <p>{pokemonDetail.sprites.front_default}</p> */}
      <p>Number: {pokemonDetail?.id}</p>
    </div>
  );
};

export default Pokemon;
