import { Association, DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../database";
import Post from "./Post";
import User from "./User";
interface CommentAttributes {
  id: String;
  userId?: Number;
  text: String;
  postId?: Number;
  name?: String;
  // email: String;
  // password: String
}

interface PostCreationAttributes extends Optional<CommentAttributes, "id"> {}
class Comment
  extends Model<CommentAttributes, PostCreationAttributes>
  implements CommentAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: String;
  text!: String;
  userId!: Number;
  postId!: Number;
  name?: String;
  // email!: String;
  // password!: String

  public static associations: {
    userId: Association<User, Comment>;
  };
  // public static associations: {
  //   roleId: Association<Comment, Role>;
  // };
  // static associate() {
  //   // define association here
  //   Comment.belongsTo(Role, {
  //     as: "role",
  //     foreignKey: "roleId",
  //   }),
  //     Comment.hasMany(Comment, {
  //       as: "posts",
  //       foreignKey: "PostId",
  //     })
  // }
}
Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "comments",
  }
);

User.hasMany(Comment, {
  as: "user_comments",
  foreignKey: "userId",
});
Post.hasMany(Comment, {
  as: "post_comments",
  foreignKey: "postId",
});
Comment.belongsTo(Post, {
  as: "post_comments",
  foreignKey: "postId",
});
Comment.belongsTo(User, {
  as: "user_comments",
  foreignKey: "userId",
});

// User.hasMany(Comment);
// Post.hasMany(Comment);
// Comment.belongsTo(Post);
// Comment.belongsTo(User);
export default Comment;
