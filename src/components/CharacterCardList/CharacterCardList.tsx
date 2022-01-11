import React from "react";
import {Card} from "../types";
import {CharacterCard} from "../CharacterCard/CharaterCard";
import './characterList.scss';

type Props = {
  setSelectedId: (id: number | null) => void;
  characterCards: Card[];
}

export const CharacterList: React.FC<Props> = ({characterCards, setSelectedId}) => {
  return (
    <div className={'characterList'}>
      {characterCards.map(card =>
        <button
          className={'characterCard'}
          key={card.id}
          onClick={() => setSelectedId(card.id)}
        >
          <CharacterCard card={card} />
        </button>
      )}
    </div>
  );
};
