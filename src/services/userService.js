import { ADMIN, MERCHANT, USER } from "../constants/roles.js";
import User from "../models/User.js";
import uploadFile from "../utils/file.js";

const createUser = async (data) => await User.create(data);

const getUser = async () => {
  const user = await User.find();

  return user;
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw {
      statusCode: 404,
      message: "User not Found",
    };
  }

  return user;
};

const updateUser = async (id, data, authUser) => {
  const user = await getUserById(id);

  if (user._id != authUser._id && !authUser.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  const newData = {
    name: data.name,
    phone: data.phone,
    address: data.address,
  };

  if (authUser.roles.includes(ADMIN)) {
    newData.roles = data.roles;
  }

  const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });

  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw {
      statusCode: 404,
      message: "User not found",
    };
  }

  return deletedUser;
};

const updateUserProfileImage = async (id, file, authUser) => {
  const user = await getUserById(id);

  if (user._id != authUser._id && !authUser.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  const uploadedFile = await uploadFile([file]);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { profileImageUrl: uploadedFile[0]?.url },
    { new: true },
  );

  return updatedUser;
};

const createMerchant = async (userId) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      roles: [USER, MERCHANT],
    },
    { new: true },
  );

  return updatedUser;
};

export default {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  updateUserProfileImage,
  createMerchant,
};
