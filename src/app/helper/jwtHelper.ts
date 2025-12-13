import jwt from "jsonwebtoken";



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

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export const jwtHelper = {
  generateToken,
  verifyToken,
};
