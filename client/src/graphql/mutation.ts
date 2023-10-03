import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation AddTodo($title: String!, $content: String!) {
    addTodo(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;
