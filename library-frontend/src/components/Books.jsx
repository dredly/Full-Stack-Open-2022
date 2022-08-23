import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import BookTable from "./BookTable";
import GenreSelection from "./GenreSelection";

const Books = (props) => {
  const [genre, setGenre] = useState("");

  const queryResult = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  if (!props.show) {
    return null;
  }

  if (queryResult.loading) {
    return <div>...loading</div>;
  }

  const books = queryResult.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <BookTable books={books} />
      <GenreSelection genre={genre} setGenre={setGenre} />
    </div>
  );
};

export default Books;
