import jwt from "jsonwebtoken";

export const verifyJWT = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};
