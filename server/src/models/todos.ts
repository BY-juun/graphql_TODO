import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "./index";
import { TodoAttributes, TodoCreationAttributes } from "../types";

export class Todos extends Model<TodoAttributes, TodoCreationAttributes> {
  public id!: number;
  public title!: string;
  public content!: string;
}

Todos.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: sequelizeInstance, tableName: "Todos" }
);

// (async () => {
//   await Posts.sync({ force: true }).then(() =>
//     console.log(
//       "Posts Table Created Because There is no Posts Table In Database"
//     )
//   );
// })();
