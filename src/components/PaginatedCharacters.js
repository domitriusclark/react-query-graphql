import React from 'react';
import { usePaginatedQuery } from 'react-query';
import { request } from 'graphql-request';

const GET_CHARACTERS = `
  query PagedCharacters($page: Int!) {
    characters(page: $page) {
      results {
        name
        id
        image
      }
    }  
  }
`;

export default function PaginatedCharacters() {
  const [page, setPage] = React.useState(1);

  const {
    status,
    resolvedData,
    error,
    isFetching
  } = usePaginatedQuery(["characters", page], async (key, page = 1) => {
    const characters = await request(
      "https://rickandmortyapi.com/graphql/",
      GET_CHARACTERS,
      { page }
    );
    return characters;
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error")
    return (
      <p>
        <strong>{error.message}</strong>
      </p>
    );

  return (
    <div>

      <div>
        {resolvedData.characters.results.map(character => (
          <React.Fragment key={character.id}>
            <p>{character.name}</p>
            <img src={character.image} alt={`${character.name}`} />
          </React.Fragment>
        ))}
        <span>Current Page: {page}</span>
        <button
          onClick={() => setPage(prevState => Math.max(prevState - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </button>
        <button
          onClick={() =>
            setPage(prevState => (prevState + 1))
          }
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}
      </div>
    </div>
  );
}