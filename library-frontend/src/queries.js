import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

export const ALL_AUTHOR_NAMES = gql`
  query {
    allAuthors {
      name
    }
  }
`;

export const ALL_BOOKS = gql`
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
`;

export const ALL_GENRES = gql`
  query allGenres {
    allGenres
  }
`;

export const ME = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`;
