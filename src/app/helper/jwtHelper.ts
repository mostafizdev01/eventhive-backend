import jwt from "jsonwebtoken";

// define payload type
export interface MyJwtPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

const generateToken = (
  payload: object,
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn
  });

  return token;
};

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as MyJwtPayload;
};

export const jwtHelper = {
  generateToken,
  verifyToken,
};
