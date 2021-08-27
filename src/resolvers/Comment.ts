import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
} from "type-graphql";
import Comment from "../../models/Comment";

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  async comments(): Promise<Comment[]> {
    try {
      const comment: Comment[] = await Comment.findAll();
      return comment;
    } catch (error) {
      return [];
    }
  }

  @Mutation(() => Comment, { nullable: true })
  async createPost(
    @Arg("userId", () => Number) userId: number,
    @Arg("postId", () => Number) postId: number,
    @Arg("name", () => String) name: string,
    @Arg("text", () => String) text: string
  ): Promise<Comment | null> {
    try {
      const comment = await Comment.create({
        userId,
        postId,
        name,
        text,
      });

      return comment;
    } catch (err) {
      return null;
    }
  }
}
