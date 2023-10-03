import gql from "graphql-tag";
import { Todos } from "./models/todos";
import { TodoAttributes, TodoCreationAttributes } from "./types";

export const typeDefs = gql`
  type Todo {
    id: ID!
    title: String
    content: String
  }
  type Query {
    allTodos: [Todo!]!
    getTodo(id: ID!): Todo
  }
  type Mutation {
    addTodo(title: String, content: String): Todo
    editTodo(id: ID!, title: String, content: String): Todo
    deleteTodo(id: ID!): Boolean
  }
`;

export const resolvers = {
  Query: {
    async allTodos() {
      return await Todos.findAll();
    },
    async getTodo(_: any, { id }: Pick<TodoAttributes, "id">) {
      return await Todos.findOne({ where: { id } });
    },
  },
  Mutation: {
    async addTodo(_: any, { title, content }: TodoCreationAttributes) {
      const newTodo = await Todos.create({
        title,
        content,
      });
      return newTodo;
    },

    async editTodo(_: any, { id, title, content }: TodoAttributes) {
      await Todos.update(
        {
          title,
          content,
        },
        { where: { id } }
      );
      return { id, title, content };
    },

    async deleteTodo(_: any, { id }: Pick<TodoAttributes, "id">) {
      try {
        await Todos.destroy({
          where: { id },
        });
      } catch (err) {
        return false;
      }
      return true;
    },
  },
};
