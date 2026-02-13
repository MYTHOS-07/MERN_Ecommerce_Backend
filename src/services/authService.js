import User from "../models/User.js";
import ResetPassword from "../models/ResetPassword.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../utils/email.js";
import config from "../config/config.js";

const login = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (!user) throw { statusCode: 404, message: "User not Found" };

  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);

  if (!isPasswordMatch)
    throw { statusCode: 400, message: "Incorrect email or password" };

  return {
    name: user.name,
    address: user.address,
    email: user.email,
    phone: user.phone,
    roles: user.roles,
    _id: user._id,
    profileImageUrl: user.profileImageUrl || "",
  };
};

const register = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (user) throw { statusCode: 400, message: "User already exists." };

  const hashedPassword = bcrypt.hashSync(data.password);

  const registeredUser = await User.create({
    name: data.name,
    address: data.address,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
  });

  return {
    _id: registeredUser._id,
    address: registeredUser.address,
    email: registeredUser.email,
    name: registeredUser.name,
    phone: registeredUser.phone,
    roles: registeredUser.roles,
  };
};

const forgetPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw { statusCode: 404, message: "User not found" };

  const token = crypto.randomUUID();

  //Send Email
  await ResetPassword.create({
    userId: user._id,
    token,
  });

  await sendEmail(email, {
    subject: "Reset password link",
    body: `
        <div>
          <h1>Please click the link to reset your password.</h1>
          <a
            href="${config.appUrl}/reset-password?token=${token}&userId=${user._id}"
            style="
              padding: 5px 15px;
              background-color: lightblue;
              color: black;
              text-decoration: none;
            "
          > Reset password 
          </a>
        </div>
      `,
  });

  return { message: "Reset password link send successfully" };
};

const resetPassword = async (userId, token, newPassword) => {
  const data = await ResetPassword.findOne({
    userId,
    expiresAt: { $gt: Date.now() },
  }).sort({ createdAt: -1 });

  if (!data || data.token !== token) {
    throw { statusCode: 400, message: "Invalid or expires token" };
  }

  if (data.isUsed) {
    throw { statusCode: 400, message: "token has already been used" };
  }

  //Send Email
  const hashedPassword = bcrypt.hashSync(newPassword);

  await User.findByIdAndUpdate(userId, { password: hashedPassword });

  await ResetPassword.findByIdAndUpdate(data._id, { isUsed: true });

  return { message: "Password reset successfully" };
};

export default { register, login, forgetPassword, resetPassword };
