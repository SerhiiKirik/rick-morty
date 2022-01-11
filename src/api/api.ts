import {Card, CharacterCards} from '../components/types';
import {BASE_URL, CHARACTER} from "./consts";

export const getData = (url: string) => (
  fetch(`${BASE_URL}/${url}`)
    .then(response => response.json())
);

export const get = (url: string) => (
  fetch(url)
    .then(response => response.json())
);

export const getMoreCharacters = (pageNumber: number): Promise<CharacterCards> => (
  getData(`${CHARACTER}/?page=${pageNumber}`)
);

export const getSelectedCharacter = (id: number): Promise<Card> => (
    getData(`${CHARACTER}/${id}`)
);

