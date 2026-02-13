import jwt from "jsonwebtoken";
import config from "../config/config.js";
// Generate JWT token

function createJWT(data) {
  const token = jwt.sign(data, config.jwtSecret, { expiresIn: "1d" });

  return token;
}

// Verify JWT token

async function verifyJWT(authToken) {
  return await new Promise((resolve, reject) => {
    const token = jwt.verify(authToken, config.jwtSecret, (error, data) => {
      if (error) throw reject(error);

      return resolve(data);
    });
  });
}

export { createJWT, verifyJWT };
