export interface Card {
  id: number;
  name: string;
  image: string;
  gender: string;
  status: string;
  species: string;
  origin: {
    name: string;
  };
}

export interface CharacterCards {
  results: Card[];
}
