// Computational things or functions

import Product from "../models/product.js";
import promptGemini from "../utils/gemini.js";
import uploadFile from "../utils/file.js";
import { ADMIN } from "../constants/roles.js";
import { PRODUCT_DESCRIPTION_PROMPT } from "../constants/prompt.js";

const getProduct = async (query) => {
  // filters
  const { category, brand, name, min, max, limit, offset, createdBy } = query;

  const sort = query.sort ? JSON.parse(query.sort) : {};

  // Al filter initialized
  const filters = {};

  if (category) filters.category = category; // Exact match
  if (brand) filters.brand = { $in: brand.split(",") }; // Match data from list of items
  if (name) filters.name = { $regex: name, $options: "i" }; // I like match
  if (min) filters.price = { $gte: min };
  if (max) filters.price = { ...filters.price, $lte: max };
  // regex means it takes value from from front and back of params and option :"i means case insensitive"
  if (createdBy) filters.createdBy = createdBy;

  const products = await Product.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset);

  return products;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product)
    throw {
      statusCode: 404,
      message: "product not found.",
    };

  return product;
};

const createProduct = async (data, files, createdBy) => {
  const promptMessage = PRODUCT_DESCRIPTION_PROMPT.replace("%s", data.name)
    .replace("%s", data.brand)
    .replace("%s", data.category);

  const description = data.description ?? (await promptGemini(promptMessage));

  const uploadedFiles = await uploadFile(files);

  const createdProduct = await Product.create({
    ...data,
    createdBy,
    imageUrls: uploadedFiles.map((item) => item?.url),
    description,
  });

  return createdProduct;
};

const updateProduct = async (id, data, files, user) => {
  const product = await getProductById(id);

  if (product.createdBy != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  const updateData = data;

  if (files && files.length > 0) {
    const uploadedFiles = await uploadFile(files);
    updateData.imageUrls = uploadedFiles.map((item) => item?.url);
  }
  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return updatedProduct;
};

const deleteProduct = async (id, user) => {
  const product = await getProductById(id);

  if (product.createdBy != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied.",
    };
  }

  await Product.findByIdAndDelete(id);
};

const getBrand = async () => {
  return await Product.distinct("brand");
};

const getCategory = async () => {
  return await Product.distinct("category");
};

const getTotalCount = async () => {
  return await Product.countDocuments();
};

export default {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getBrand,
  getCategory,
  getTotalCount,
};
