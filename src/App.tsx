import React, {useEffect, useMemo, useState} from 'react';
import './App.scss';
import { Oval } from 'react-loader-spinner';
import { getMoreCharacters } from './api/api';
import {Card, ReactSelectOption} from './components/types';
import { CharacterList } from './components/CharacterCardList/CharacterCardList';
import { CharacterStats } from './components/CharacterStats/CharacterStats';
import {MultiValue} from "react-select";
import {CharacterFilters} from "./components/CharacterFilters/CharacterFilters";

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Card[] | []>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<MultiValue<ReactSelectOption<string>>>([]);
  const [genderFilter, setGenderFilter] = useState<MultiValue<ReactSelectOption<string>>>([]);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<MultiValue<ReactSelectOption<string>>>([]);

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
    }), [pageNumber];
  };

  const preparedCharacters = useMemo(() => {
    if (!selectedFilters.length) {
      return characters;
    }

    const preparedFilters = selectedFilters.map(filter => filter.value);

    return characters.filter(character => preparedFilters.some(el => el.includes(character.species))
    );
  }, [selectedFilters, characters]);

  const species = [
    "Human", "Alien", "Humanoid",
    "Poopybutthole", "Mythological", "Unknown",
    "Animal", "Disease","Robot","Cronenberg","Planet",
  ];
  const genders = ["female", "male", "genderless", "unknown"];
  const status = ["Alive", "Dead", "Unknown"];

  return (
    <div className="App__wrapper">
      <div className="App__CharacterFilters">
        <CharacterFilters
          selectedFilters={genderFilter}
          setSelectedFilters={setGenderFilter}
          className="App__filters"
          filter={genders}
        />

        <CharacterFilters
          selectedFilters={statusFilter}
          setSelectedFilters={setStatusFilter}
          className="App__filters"
          filter={status}
        />

        <CharacterFilters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          className="App__filters"
          filter={species}
        />
      </div>

      {!isLoading && !preparedCharacters.length
      && <h2 className="App__noCharacters">Have not characters</h2>}

      <CharacterList
        setSelectedId={setSelectedId}
        characterCards={preparedCharacters}
      />

      {isLoading && !characters.length && (
        <div className="App__loader">
          <Oval
            color="#000"
            height={150}
            width={150}
          />
        </div>
      )}

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
