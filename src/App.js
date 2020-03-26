import React from 'react';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { request } from 'graphql-request';


function App() {
  const GET_CHARACTERS = `
    {
      characters {
        results {
          name
          id
          image
        }
      }
    }
  `;

  const { data, status, error } = useQuery('characters', async () => {
    const characters = await request('https://rickandmortyapi.com/graphql/', GET_CHARACTERS);
    return characters;
  })

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p><strong>{error.message}</strong></p>;

  return (
    <div>
      <ReactQueryDevtools />
      {data.characters.results.map(character => (
        <React.Fragment key={character.id}>
          <p>{character.name}</p>
          <img src={character.image} alt="Rick and Morty Character" />
        </React.Fragment>
      ))}
    </div>
  )
}

export default App;