import { MaxLength, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field(() => String)
  @Length(1, 255)
  name!: string;
  
  @Field(() => String)
  @Length(1, 255)
  email!: string;
  
  @Field(() => String)
  @MaxLength(30)
  password!: string;
}
