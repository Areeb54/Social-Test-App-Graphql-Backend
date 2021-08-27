import {
  Association,
  DataTypes,
  INTEGER,
  Model,
  Optional,
  UUIDV4,
} from "sequelize";
import { Field, ObjectType } from "type-graphql";
import sequelize from "../database";

interface UserAttributes {
  id: Number;
  name: String;
  email: String;
  password: String;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@ObjectType()
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  @Field(() => String)
  id!: number;
  @Field(() => String)
  name!: string;
  @Field(() => String)
  email!: string;
  @Field(() => String)
  password!: string;
  @Field(() => String)
  token!: string;

  // public static associations: {
  //   roleId: Association<User, Role>;=
  // };
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
      // unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Users",
    tableName: "Users",
  }
);
export default User;
