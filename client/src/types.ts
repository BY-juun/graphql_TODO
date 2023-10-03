export interface TodoAttributes {
  id: number;
  title: string;
  content: string;
}

export type TodoCreationAttributes = Omit<TodoAttributes, "id">;
