import gql from "graphql-tag";

let users = [
  { id: "1", firstName: "a", lastName: "bc", fullName: "abc" },
  { id: "2", firstName: "e", lastName: "fg" },
];

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Query {
    allUsers: [User!]!
  }
`;

export const resolvers = {
  Query: {
    allUsers() {
      console.log("allUsers Called");
      return users;
    },
  },
};
