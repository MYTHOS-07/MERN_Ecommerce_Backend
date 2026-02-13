import userService from "../services/userService.js";

const createUser = async (req, res) => {
  try {
    const data = await userService.createUser(req.body);

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getUsers = async (req, res) => {
  const data = await userService.getUser(req.body);

  return res.json(data);
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await userService.getUserById(id);

    return res.json(data);
  } catch (error) {
    return res.status(error.statusCode || 500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    
    const id = req.params.id;
    const data = await userService.updateUser(id, req.body, req.user);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await userService.deleteUser(id);

    return res.send(`User deleted successfully with id:  ${id}`);
  } catch (error) {
    return res.status(error.statusCode || 500).send(error.message);
  }
};

const updateUserProfileImage = async (req, res) => {
  const id = req.params.id;
  const file = req.file;

  try {
    const data = await userService.updateUserProfileImage(id, file, req.user);

    return res.json(data);
  } catch (error) {
    return res.status(error.statusCode || 500).send(error.message);
  }
};

const getOrdersOfMerchant = async (req, res) => {
  try {
    const data = await orderService.getOrdersOfMerchant(req.user._id);

    return res.json(data);
  } catch (error) {
    return res.status(500).send(error?.message);
  }
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserProfileImage,
  getOrdersOfMerchant,
};
