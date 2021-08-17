import { Association, DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../database";

interface UserAttributes {
  id: String;
  name: String;
  email: String;
  password: String;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: String;
  name!: String;
  email!: String;
  password!: String;

  // public static associations: {
  //   roleId: Association<User, Role>;
  // };
}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
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
    modelName: "users",
  }
);
export default User;
