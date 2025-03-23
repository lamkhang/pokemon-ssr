import Button from "src/components/Button";
import Dropdown from "src/components/Dropdown";
import BtnFilterType from "src/components/BtnFilterType";
import Pokemon from "src/components/Pokemon";
import { DataResult, Result, ResultFilterType } from "src/types";
import MultiSelect from "src/components/MultiSelect";
import { getPokemons, getTypes } from "src/apis";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const pageParam = +(params?.page || 0);
  const typesParam = params?.types?.toString()?.split(",") || [];
  const limitParam = +(params?.limit || 20);
  // const text = await params;

  const resTypes = await getTypes();
  const types: DataResult = await resTypes.json();

  const isFilterTypes = typesParam.length > 0;
  let pokemonsFilter: Result[] = [];
  let pokemons: DataResult = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  if (isFilterTypes) {
    const resPokemonsFilter = await Promise.allSettled(
      types.results
        .filter(({ name }) => typesParam.includes(name))
        .map(async ({ url }) => {
          const res = await fetch(url);
          const dataPokemonsFilter: ResultFilterType = await res.json();
          return dataPokemonsFilter.pokemon.map(({ pokemon }) => pokemon);
        })
    );

    pokemonsFilter = resPokemonsFilter.reduce(
      (results: Result[], item) => [
        ...results,
        ...(item.status === "fulfilled"
          ? item.value.filter(
              (pokemon) =>
                results.findIndex(({ name }) => pokemon.name === name) === -1
            )
          : []),
      ],
      []
    );
  } else {
    const resPokemons = await getPokemons({ limitParam, pageParam });
    pokemons = await resPokemons.json();
  }

  const renderPokemons = () => {
    if (isFilterTypes && pokemonsFilter.length > 0) {
      return pokemonsFilter
        .slice(limitParam * pageParam, limitParam * (pageParam + 1))
        .map((pokemons, index) => (
          <Pokemon key={pokemons.name + index} pokemon={pokemons} />
        ));
    }
    if (pokemons.results.length > 0) {
      return pokemons.results.map((pokemons, index) => (
        <Pokemon key={pokemons.name + index} pokemon={pokemons} />
      ));
    }

    return <div className="text-center mx-auto">No Result</div>;
  };

  return (
    <div className="min-h-screen p-4 max-w-[1200px] mx-auto font-[family-name:var(--font-noto-sans)]">
      <div className="text-2xl text-center">
        Welcome to Pokemon world render by SSG
      </div>
      <div>Total: {pokemonsFilter.length || pokemons.count}</div>
      <div className="flex lg:hidden gap-1 items-center">
        <div>Types</div>
        <MultiSelect options={types.results.map(({ name }) => name)} />
      </div>
      <div className="flex-wrap gap-1 items-center hidden lg:flex">
        <div>Types</div>
        {types.results.map(({ name }, index) => (
          <BtnFilterType name={name} key={index} />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 mt-4 gap-2">
        {renderPokemons()}
      </div>
      <div className="flex justify-end mt-4">
        <Dropdown options={["20", "30", "50"]} />
      </div>
      <div className="flex gap-2 justify-center mt-4">
        {pageParam > 0 && <Button name="Prev" type="prev" />}
        {(pageParam + 1) * limitParam <
          (isFilterTypes ? pokemonsFilter.length : pokemons.count) && (
          <Button name="Next" type="next" />
        )}
      </div>
    </div>
  );
}
