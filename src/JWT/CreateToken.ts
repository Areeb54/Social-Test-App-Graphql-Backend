import { UserInputError } from "apollo-server";
import { Request, RequestHandler, NextFunction, Response } from "express";
import jwt, { sign, verify } from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { MiddlewareFn } from "type-graphql";

export interface user {
  id: string | number;
  name: string | number;
}
const key = "asasdg#@$@!@!1212#212e3";
const CreateToken = (user: user) => {
  const accessToken = sign({ name: user.name, id: user.id }, key, {
    expiresIn: "24h",
  });
  return accessToken;
};

export default CreateToken;

interface authBody extends Request {
  userId?: number | undefined;
}

export const isAuthenticated: MiddlewareFn<any> = async ({ context }, next) => {
  try {
    const { req } = context;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UserInputError("authentication credetils were not provided");
      // return {
      //   res,
      //   status: 401,
      //   message: "authentication credentials were not provided",
      // };
    }
    const decoded: any = jwt_decode(token);

    // const decoded: any = jwt.verify(token, key);
    // console.log("--------------DECOEDED--------------", decoded.id);
    req.body.userId = decoded.id;
    return next();
    // next();
  } catch (e) {
    console.log("problem is here in authenticating a user" + e);
    return { status: 500, message: "Server side Error isAuth" };
    //  throw new UserInputError("Server side Error isAuth");
  }
};
