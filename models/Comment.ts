import { Association, DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { Field, Int, ObjectType } from "type-graphql";
import sequelize from "../database";

interface CommentAttributes {
  id: number;
  userId: number;
  postId: number;
  name: string;
  text: string;
}

interface ComentCreationAttributes extends Optional<CommentAttributes, "id"> {}
@ObjectType()
class Comment
  extends Model<CommentAttributes, ComentCreationAttributes>
  implements CommentAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  @Field(() => Int)
  id!: number;
  @Field(() => Int)
  userId!: number;
  @Field(() => Int)
  postId!: number;
  @Field(() => String)
  name!: string;
  @Field(() => String)
  text!: string;

  // public static associations: {
  //   roleId: Association<Comment, Role>;
  // };
}
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comment",
  }
);
export default Comment;
