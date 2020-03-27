import React from 'react';
import { useQuery } from 'react-query';
import { request } from 'graphql-request';

const SEARCH_CHARACTER = `
  query SearchCharacter($name: String!) {
    characters(filter: { name: $name }) {
      results {
        name
        id
        image
      }
    }
  }
`;

export default function SearchedCharacters() {
  const [input, setInput] = React.useState();
  const [characterName, setCharacterName] = React.useState();

  const { data, status, error } = useQuery(
    characterName && ["searchedList", characterName],
    async (key, arg) => {
      const characters = await request(
        "https://rickandmortyapi.com/graphql/",
        SEARCH_CHARACTER,
        {
          name: arg
        }
      );

      return characters;
    }
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;

  return (
    <div>
      <input type="text" onChange={e => setInput(e.target.value)} />
      <button onClick={() => setCharacterName(input)}>Search</button>
      {data &&
        data.characters.results.map(character => (
          <React.Fragment>
            <p>{character.name}</p>
            <img src={character.image} alt="Rick and Morty Character" />
          </React.Fragment>
        ))}
    </div>
  );
}