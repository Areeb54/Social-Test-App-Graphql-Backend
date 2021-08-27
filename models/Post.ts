import { Association, DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { Field, Int, ObjectType } from "type-graphql";
import sequelize from "../database";

interface PostAttributes {
  id: number;
  userId: number;
  imageUrl: string;
  description: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, "id"> {}
@ObjectType()
class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
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
  @Field(() => String)
  imageUrl!: string;
  @Field(() => String)
  description!: string;

  // public static associations: {
  //   roleId: Association<Post, Role>;
  // };
}
Post.init(
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Posts",
  }
);
export default Post;
