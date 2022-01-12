import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';
import { Oval } from 'react-loader-spinner';
import { MultiValue } from 'react-select';
import { getMoreCharacters } from './api/api';
import { Card, ReactSelectOption } from './components/types';
import { CharacterList } from './components/CharacterCardList/CharacterCardList';
import { CharacterStats } from './components/CharacterStats/CharacterStats';
import { CharacterFilters } from './components/CharacterFilters/CharacterFilters';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Card[] | []>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<MultiValue<ReactSelectOption<string>>>([]);
  const [selectedStatus, setSelectedStatus] = useState<MultiValue<ReactSelectOption<string>>>([]);
  const [selectedGenders, setSelectedGenders] = useState<MultiValue<ReactSelectOption<string>>>([]);

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

    const preparedFilters = selectedFilters.map(filter => filter.value);
    const preparedFiltersGender = selectedGenders.map(filter => filter.value);
    const preparedFiltersStatus = selectedStatus.map(filter => filter.value);

    const filterBySpecies = characters.filter(
      character => {
        const isFilterChosen = preparedFilters.length ? preparedFilters.some(element =>
            element.includes(character.species)) : true;

        const isGenderChosen = preparedFiltersGender.length
          ? preparedFiltersGender.some(element => element.includes(character.gender))
          : true;

        const isStatusChosen = preparedFiltersStatus.length
          ? preparedFiltersStatus.some(element => element.includes(character.status))
          : true;

        return isFilterChosen && isGenderChosen && isStatusChosen;
      });

    return filterBySpecies;
  }, [selectedFilters, characters, selectedStatus, selectedGenders]);

  console.log(preparedCharacters)

  const species = [
    'Human', 'Alien', 'Humanoid',
    'Poopybutthole', 'Mythological', 'Unknown',
    'Animal', 'Disease', 'Robot', 'Cronenberg', 'Planet',
  ];
  const status = ["Alive", "Dead", "Unknown"];
  const genders = ["Female", "Male", "Genderless", "Unknown"];

  return (
    <div className="App__wrapper">
      <div className="App__CharacterFilters">
        <CharacterFilters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          className="App__filters"
          filter={species}
          placeholder={'Select species'}
        />

        <CharacterFilters
          selectedFilters={selectedStatus}
          setSelectedFilters={setSelectedStatus}
          className={"App__filters"}
          filter={status}
          placeholder={'Select status'}
        />

        <CharacterFilters
          selectedFilters={selectedGenders}
          setSelectedFilters={setSelectedGenders}
          className={"App__filters"}
          filter={genders}
          placeholder={'Select genders'}
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
