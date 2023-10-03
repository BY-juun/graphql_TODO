export interface PostAttributes {
  id: number;
  title: string;
  content: string;
}

export type PostCreationAttributes = Omit<PostAttributes, "id">;
