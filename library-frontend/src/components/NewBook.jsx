import { useState } from "react";
import { gql } from "@apollo/client";
import uniqueByTitle from "../utils/uniqueByTitle";
import { useMutation } from "@apollo/client/react";
import { CREATE_BOOK } from "../mutations";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.log(error.message);
    },
    update: (cache, response) => {
      cache.updateQuery(
        {
          query: gql`
            query allBooks($genre: String) {
              allBooks(genre: $genre) {
                title
                author {
                  name
                }
                published
                genres
              }
            }
          `,
          variables: { genre: "" },
        },
        ({ allBooks }) => {
          return {
            allBooks: uniqueByTitle(allBooks.concat(response.data.addedBook)),
          };
        }
      );
      // Then update all the filtered queries for genres of the new book
      response.data.addedBook.genres.forEach((g) => {
        cache.updateQuery(
          {
            query: gql`
              query allBooks($genre: String) {
                allBooks(genre: $genre) {
                  title
                  author {
                    name
                  }
                  published
                  genres
                }
              }
            `,
            variables: { genre: g },
          },
          ({ allBooks }) => {
            return {
              allBooks: uniqueByTitle(allBooks.concat(response.data.addedBook)),
            };
          }
        );
      });
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = (event) => {
    event.preventDefault();

    addBook({
      variables: { title, author, published: Number(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
