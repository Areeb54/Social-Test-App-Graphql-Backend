import { StringDecoder } from "string_decoder";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  UseMiddleware,
  Authorized,
} from "type-graphql";
import Post from "../../models/Post";
import { isAuthenticated } from "../JWT/CreateToken";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    try {
      const post: Post[] = await Post.findAll();
      return post;
    } catch (error) {
      return [];
    }
  }

  // @UseMiddleware(isAuthenticated)
  @Authorized()
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("userId", () => Number) userId: number,
    @Arg("imageUrl", () => String) imageUrl: string,
    @Arg("description", () => String) description: string
  ): Promise<Post | null> {
    try {
      const post = await Post.create({
        userId,
        imageUrl,
        description,
      });

      return post;
    } catch (err) {
      return null;
    }
  }

  @Mutation(() => String, { nullable: true })
  async updatePost(
    @Arg("id", () => Number) id: number,
    @Arg("imageUrl", () => String) imageUrl: string,
    @Arg("description", () => String) description: string
  ): Promise<Post | null | string> {
    try {
      await Post.update(
        {
          id,
          imageUrl,
          description,
        },
        { where: { id } }
      );

      return "user updated";
    } catch (err) {
      return null;
    }
  }
}
