import React from "react";
import { Card } from "../types";
import './CharaterCard.scss';
import classNames from "classnames";

type Props = {
  card: Card;
};

export const CharacterCard: React.FC<Props> = ({card}) => {
  const {image, origin, name, status} = card;
  const imageUrl = image;

  return (
    <>
      <img
        className="characterCard__img"
        src={imageUrl}
        alt={card.name}
      />

      <div className="characterCard__wrapper">
        <div className="characterCard__name">
          {name}
        </div>

        <div className="characterCard__info">
          <span>Status: </span>
          <div className={classNames("characterCard__status",
            { characterCard__status_red: status === 'Dead'}
          ,
          {characterCard__status_gray: status === 'unknown'}
          )}>
            {status}
          </div>

          <div className={'characterCard__location'}>
            'Location' {origin.name}
          </div>
        </div>
      </div>
    </>
  );
}
