export interface Result {
  name: string;
  url: string;
}

export interface DataResult {
  count: number;
  next: null | string;
  previous: null | string;
  results: Result[];
}

export interface ResultFilterType {
  pokemon: Array<{
    pokemon: Result;
    slot: number;
  }>;
}

export interface PokemonDetail {
  id: string;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
}
