import { Model, DataTypes } from "sequelize";
import { sequelizeInstance } from "./index";
import { PostAttributes, PostCreationAttributes } from "../types";

export class Posts extends Model<PostAttributes, PostCreationAttributes> {
  public id!: number;
  public title!: string;
  public content!: string;
}

Posts.init(
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
  { sequelize: sequelizeInstance, tableName: "Posts" }
);

// (async () => {
//   await Posts.sync({ force: true }).then(() =>
//     console.log(
//       "Posts Table Created Because There is no Posts Table In Database"
//     )
//   );
// })();
