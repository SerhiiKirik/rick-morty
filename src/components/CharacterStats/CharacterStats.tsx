import React, { useEffect, useState } from 'react';
import {Card} from "../types";
import {getSelectedCharacter} from "../../api/api";
import { Oval } from 'react-loader-spinner';

type Props = {
  selectedId: number;
  closeStats: () => void;
};

export const CharacterStats: React.FC<Props> = ({ selectedId, closeStats }: Props) => {
  const [character, setCharacter] = useState<Card | null>(null);
  const [lastEpisode, setLastEpisode] = useState<string>()

  useEffect(() => {
    setCharacter(null);
    getSelectedCharacter(selectedId)
      .then(data => {
        setCharacter(data)
      });
    if (character?.episode) {
      fetch(character?.episode[character?.episode.length - 1])
        .then(data => data.json())
        .then(data => setLastEpisode(data.name))
    }
  }, [selectedId]);

  if (!character) {
    return (
      <div className="characterStats__content">
        <Oval
          color="#000"
          height={150}
          width={150}
        />
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className="blur"
        onClick={() => closeStats()}
      />
      <div className="characterStats__content">

        <button
          type="button"
          className="characterStats__closeBtn"
          onClick={() => closeStats()}
        >
          X
        </button>

        <img
          className="characterStats__img"
          src={`${character.image}`}
          alt={`${character.name}`}
        />

        <div className="characterStats__content__name">
          {character.name}
        </div>

        <table
          className="characterStats"
        >
          <tbody>
            {
              <tr>
                <td className="characterStats__name">
                  <span className="characterStats__info">
                    Gender: {character.gender}
                  </span>
                </td>

                <td className="characterStats__stat">
                  <span className="characterStats__info">
                    Species: {character.species}
                  </span>
                </td>

                <td className="characterStats__stat">
                  <span className="characterStats__info">
                    Location: {character.origin.name}
                  </span>
                </td>

                {lastEpisode && <td className="characterStats__stat">
                  <span className="characterStats__info">
                    Last episode: {lastEpisode}
                  </span>
                </td>
                }
              </tr>
            }
          </tbody>
        </table>
      </div>
    </>

  );
};
