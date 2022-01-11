import React from 'react';
import classNames from 'classnames';
import { Card } from '../types';
import './CharaterCard.scss';

type Props = {
  card: Card;
};

export const CharacterCard: React.FC<Props> = ({ card }) => {
  const {
    image, origin, name, status,
  } = card;
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
          <div className={classNames('characterCard__status',
            { characterCard__status_red: status === 'Dead' },
            { characterCard__status_gray: status === 'unknown' })}
          >
            {status}
          </div>

          <div className="characterCard__location">
            <span className="characterCard__location-title">
              Location:
            </span>
            {' '}
            {origin.name}
          </div>
        </div>
      </div>
    </>
  );
};
