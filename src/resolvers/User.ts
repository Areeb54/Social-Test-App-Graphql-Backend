import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Int,
} from "type-graphql";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { RegisterInput } from "./register/RegisterInput";
import { UserInputError } from "apollo-server";
import CreateToken from "../JWT/CreateToken";

@ObjectType()
class LoginResponse {
  @Field(() => User)
  user!: User;
  @Field(() => String)
  token!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    try {
      const users: User[] = await User.findAll();
      return users;
    } catch (error) {
      return [];
    }
  }

  @Mutation(() => User, { nullable: true })
  async registerUser(
    @Arg("registerInput", () => RegisterInput) { name, email, password }: RegisterInput
  ): // @Arg("name", () => String) name: string,
  // @Arg("email", () => String) email: string,
  // @Arg("password", () => String) password: string
  Promise<User> {
    // const { name, email, password } = data;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    user.save();
    return user;
  }

  @Mutation(() => LoginResponse)
  async Login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string
    // @Arg("data", () => RegisterInput) { email, password }: RegisterInput
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new UserInputError("Invalid Username");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new UserInputError("Invalid Password");
    } else {
      const tok = CreateToken(user);
      // console.log("-----------------------");
      // console.log(user);
      // console.log(valid);
      user.token = tok;
      return { user, token: tok };
    }
  }
}
