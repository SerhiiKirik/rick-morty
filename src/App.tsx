import React, {useEffect, useState} from 'react';
import './App.scss';
import { getCharacters } from './api/api';
import { Card } from "./components/types";
import {CharacterList} from "./components/CharacterCardList/CharacterCardList";


export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [characters, setCharacters] = useState<Card[] | []>([])
  useEffect(() => {
    setIsLoading(true);
    getCharacters()
      .then(data => setCharacters(data.results));
    setIsLoading(false);
  }, []);

  console.log(characters, isLoading)

  return (
    <div>
      <h1>Dynamic list of Goods</h1>
      <CharacterList characterCards={characters} />
    </div>
  );
};
