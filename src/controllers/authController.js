import authService from "../services/authService.js";
import { createJWT } from "../utils/jwt.js";

const login = async (req, res) => {
  const input = req.body;
  try {
    if (!input) {
      return res.status(400).send("Required data are missing");
    }

    // for saying email is required
    if (!input.email) {
      return res.status(400).send("Email is required");
    }

    // for saying password is required
    if (!input.password) {
      return res.status(400).send("password is required");
    }

    const data = await authService.login(input);

    // Generate JWT token
    const authToken = createJWT(data);

    res.cookie("authToken", authToken, { maxAge: 86400 * 1000 });

    res.json({ ...data, authToken });
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const register = async (req, res) => {
  const input = req.body;

  try {
    if (!input.password) {
      return res.status(400).send("Password is required.");
    }

    if (!input.confirmPassword) {
      return res.status(400).send("Confirm password is required.");
    }

    if (input.password !== input.confirmPassword) {
      return res.status(400).send("Passwords do not match.");
    }

    const data = await authService.register(input);

    const authToken = createJWT(data);

    res.cookie("authToken", authToken);

    res.status(201).json({ ...data, authToken });
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const forgetPassword = async (req, res) => {
  const input = req.body;

  if (!input.email) {
    return res.status(400).send("Email address is required");
  }

  try {
    const data = await authService.forgetPassword(input.email);

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const resetPassword = async (req, res) => {
  const input = req.body;
  const query = req.query;

  if (!query.token || !query.userId) {
    return res.status(400).send("Token and user Id are required");
  }

  // for saying password is necessary
  if (!input.password) {
    return res.status(400).send("password is required");
  }

  try {
    const data = await authService.resetPassword(
      query.userId,
      query.token,
      input.password,
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const logout = async (req, res) => {
  await res.clearCookie("authToken");
  res.json({ message: "Logout Successfully" });
};

export default { register, login, forgetPassword, resetPassword, logout };
