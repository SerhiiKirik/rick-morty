import React from "react";
import { Card } from "../types";

type Props = {
  card: Card;
};

export const CharacterCard: React.FC<Props> = ({card}) => {
  const {image, origin, name, status} = card;
  const imageUrl = image;

  return (
    <div className="characterCard__wrapper">
      <img
        className="characterCard__img"
        src={imageUrl}
        alt={card.name}
      />

      <div className="characterCard__name">
        {name}
      </div>

      <div className="characterCard__info">
        <div className="characterCard__status">
          {status}
        </div>

        <div className={'characterCard__location'}>
          'Location' {origin.name}
        </div>
      </div>
    </div>
  );
}
