import { gql } from "@apollo/client";
import { PERSON_DETAILS } from "./fragments";

export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;
