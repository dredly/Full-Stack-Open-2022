import { useQuery } from "@apollo/client";
import { ALL_GENRES } from "../queries";

const GenreSelection = ({ genre, setGenre }) => {
  const queryResult = useQuery(ALL_GENRES);

  if (queryResult.loading) {
    return <div>...loading</div>;
  }

  const genres = queryResult.data.allGenres;

  return (
    <div>
      {[...genres].map((g) => (
        <button
          key={g}
          onClick={() => setGenre(g)}
          className={genre === g ? "active-button" : ""}
        >
          {g}
        </button>
      ))}
      <button
        onClick={() => setGenre("")}
        className={genre === "" ? "active-button" : ""}
      >
        All genres
      </button>
    </div>
  );
};

export default GenreSelection;
