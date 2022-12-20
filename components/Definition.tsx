import React from 'react'
import { BiSun } from 'react-icons/bi';
import { MdDarkMode } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { AiFillSound } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';

function Definition({definition, prompt, state, dispatch}) {

    const play = (source) => {
        const sound = new Audio(source);
        sound.play();
      };
  return (
    <div
          className={`flex-1 ${
            definition.length === 0 ? 'flex items-center justify-center' : null
          } mt-2 lg:mt-8`}
        >
          {definition.length === 0 ? (
            <p>{prompt}</p>
          ) : (
            definition.map((define, i) => (
              <div
                style={{
                  boxShadow: '0px 0px 11px 10px rgba(0,0,0,0.1)',
                }}
                key={i}
                className="mb-6 p-4 rounded-md bg-white dark:bg-gray-800"
              >
                <div className="flex gap-3 mb-3 items-center">
                  <p className="text-4xl font-bold">{define.word}</p>
                  <div className="flex items-center gap-1">
                    {define.phonetics.map((phonetic, i) => (
                      <div key={i} className="flex items-center">
                        <p>{phonetic.text}</p>
                        {phonetic.audio ? (
                          <AiFillSound
                            onClick={() => {
                              play(phonetic.audio);
                            }}
                            className="cursor-pointer"
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                  {state.favorites.includes(define.word) ? (
                    <AiFillStar
                      onClick={() => {
                        dispatch({
                          type: 'REMOVE',
                          payload: { word: define.word },
                        });
                      }}
                      className="text-2xl cursor-pointer"
                    />
                  ) : (
                    <AiOutlineStar
                      onClick={() => {
                        dispatch({
                          type: 'ADD',
                          payload: { word: define.word },
                        });
                      }}
                      className="text-2xl cursor-pointer"
                    />
                  )}
                </div>
                {define.meanings.map((meaning, i) => (
                  <div key={i} className="mb-8">
                    <p className="italic">{meaning.partOfSpeech}</p>
                    <ol className="list-decimal px-8 mt-1">
                      {meaning.definitions.map((definition, i) => (
                        <li key={i} className="p-1">
                          <p>{definition.definition}</p>
                          {definition.example ? (
                            <p>Example: {definition.example}</p>
                          ) : null}
                        </li>
                      ))}
                    </ol>
                    <div className="px-8 text-md mt-2">
                      <p>
                        <span className="font-semibold">
                          Synonyms:{' '}
                          {meaning.synonyms.map((synonym, i) => (
                            <span key={i} className="font-thin italic">
                              {' '}
                              {synonym},
                            </span>
                          ))}
                        </span>
                      </p>
                      <p className="mt-2">
                        <span className="font-semibold">Antonyms:</span>
                        {meaning.antonyms.map((antonym, i) => (
                          <span key={i} className="italic">
                            {' '}
                            {antonym},
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
  )
}

export default Definition