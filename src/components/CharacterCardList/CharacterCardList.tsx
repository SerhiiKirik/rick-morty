import React from "react";
import {Card} from "../types";
import {CharacterCard} from "../CharacterCard/CharaterCard";

type Props = {
  characterCards: Card[];
}

export const CharacterList: React.FC<Props> = ({characterCards}) => {
  return (
    <div>
      {characterCards.map(card =>
        <div className={'characterCard'} key={card.id}>
          <CharacterCard card={card} />
        </div>
      )}
    </div>
  );
};
