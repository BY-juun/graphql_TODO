import { gql } from "@apollo/client";

export const ALL_TODOS = gql`
  query getAllTodos {
    allTodos {
      id
      title
      content
    }
  }
`;
