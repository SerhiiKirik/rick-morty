import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import {ReactSelectOption} from "../types";

interface Props {
  selectedFilters: MultiValue<ReactSelectOption<string>>;
  setSelectedFilters: (filters: MultiValue<ReactSelectOption<string>>) => void;
  className: string;
  filter: string[];
};

export const CharacterFilters: React.FC<Props> = ({
  selectedFilters,setSelectedFilters, filter,}) => {
  const [options, setOptions] = useState<MultiValue<ReactSelectOption<string>>>([]);

  useEffect(() => {
    setOptions(filter.map(type => ({
      value: type,
      label: type,
    })))
    }, []);

  return (
    <div className={'App__filters'}>
      <Select
        options={options}
        isMulti
        value={selectedFilters}
        onChange={(filters) => setSelectedFilters(filters)}
        placeholder={'Select species'}
      />
    </div>
  );
};
