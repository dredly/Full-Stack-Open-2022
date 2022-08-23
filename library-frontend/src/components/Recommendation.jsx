import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import BookTable from "./BookTable";

const Recommendation = (props) => {
  const { data } = useQuery(ME);
  console.log("data", data);

  const favouriteGenre = data?.me?.favouriteGenre;

  const queryResult = useQuery(ALL_BOOKS, {
    variables: { genre: favouriteGenre },
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
      <h1>recommendations</h1>
      <p>
        Books in you favourite genre <strong>{favouriteGenre}</strong>
      </p>
      <BookTable books={books} />
    </div>
  );
};

export default Recommendation;
