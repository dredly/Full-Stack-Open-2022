import { useState } from "react";
import { gql, useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED } from "./subscriptions";
import { ALL_AUTHORS, ALL_GENRES } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendation from "./components/Recommendation";
import uniqueByTitle from "./utils/uniqueByTitle";

const App = () => {
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`New book ${addedBook.title} added !`);
      client.refetchQueries({ include: [ALL_AUTHORS, ALL_GENRES] });
      // First update the query for all books, technically with a filter value
      // of "" empty string
      client.cache.updateQuery(
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
            allBooks: uniqueByTitle(allBooks.concat(addedBook)),
          };
        }
      );
      // Then update all the filtered queries for genres of the new book
      addedBook.genres.forEach((g) => {
        client.cache.updateQuery(
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
              allBooks: uniqueByTitle(allBooks.concat(addedBook)),
            };
          }
        );
      });
    },
  });

  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <span>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>Logout</button>
          </span>
        ) : (
          <button onClick={() => setPage("login")}>Login</button>
        )}
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendation show={page === "recommend"} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
