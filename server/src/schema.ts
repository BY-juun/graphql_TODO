import gql from "graphql-tag";
import { Posts } from "./models/posts";
import { PostAttributes, PostCreationAttributes } from "./types";

export const typeDefs = gql`
  type Post {
    id: ID!
    title: String
    content: String
  }
  type Query {
    allPosts: [Post!]!
    getPost(id: ID!): Post
  }
  type Mutation {
    addPost(title: String, content: String): Post
    editPost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): Boolean
  }
`;

export const resolvers = {
  Query: {
    async allPosts() {
      return await Posts.findAll();
    },
    async getPost(_: any, { id }: Pick<PostAttributes, "id">) {
      return await Posts.findOne({ where: { id } });
    },
  },
  Mutation: {
    async addPost(_: any, { title, content }: PostCreationAttributes) {
      const newPost = await Posts.create({
        title,
        content,
      });
      return newPost;
    },

    async editPost(_: any, { id, title, content }: PostAttributes) {
      await Posts.update(
        {
          title,
          content,
        },
        { where: { id } }
      );
      return { id, title, content };
    },

    async deletePost(_: any, { id }: Pick<PostAttributes, "id">) {
      try {
        await Posts.destroy({
          where: { id },
        });
      } catch (err) {
        return false;
      }
      return true;
    },
  },
};
