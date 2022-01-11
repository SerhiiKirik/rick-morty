import React, {useEffect, useState} from 'react';
import './App.scss';
import { getMoreCharacters} from './api/api';
import { Card } from "./components/types";
import {CharacterList} from "./components/CharacterCardList/CharacterCardList";
import {CharacterStats} from "./components/CharacterStats/CharacterStats";


export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<Card[] | []>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getMoreCharacters(pageNumber)
      .then(data => setCharacters(data.results));
    setIsLoading(false);
  }, []);

  const loadMore = () => {
    setIsLoading(true);
    setPageNumber(currentPageNumber => {
      const newPageNumber = currentPageNumber + 1;

      getMoreCharacters(newPageNumber)
        .then(data => {
        setCharacters(prevData => [...prevData, ...data.results]);
        setIsLoading(false);
      });

      return newPageNumber;
    });
  };

  console.log(characters, isLoading)

  return (
    <div>
      <CharacterList
        setSelectedId={setSelectedId}
        characterCards={characters}
      />

      {selectedId && (
        <CharacterStats
          selectedId={selectedId}
          closeStats={() => setSelectedId(null)}
        />
      )}

      <button
        className="App__button"
        type="button"
        onClick={loadMore}
        disabled={isLoading}
      >
        Load more
      </button>
    </div>
  );
};
