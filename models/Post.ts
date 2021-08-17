import { Association, DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../database";
import User from "./User";

interface PostAttributes {
  id: String;
  userId?: Number;
  description: String;
  imageUrl?: String;
  // email: String;
  // password: String
  // comments:Comment[]
}

interface PostCreationAttributes extends Optional<PostAttributes, "id"> {}
class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: String;
  description!: String;
  imageUrl!: String;
  userId!: Number;
  public readonly comments?: Comment[];
  // email!: String;
  // password!: String

  // Association:

  public static associations: {
    userId: Association<User, Post>;
  };

  // public static associations: {
  //   roleId: Association<Post, Role>;
  // };
  // static associate() {
  //   // define association here
  //   Post.belongsTo(Role, {
  //     as: "role",
  //     foreignKey: "roleId",
  //   }),
  //     Post.hasMany(Post, {
  //       as: "posts",
  //       foreignKey: "PostId",
  //     })
  // }
}
Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "posts",
  }
);

User.hasMany(Post);
Post.belongsTo(User);
export default Post;
