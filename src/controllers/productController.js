// handles HTTP request, responses, status code. DUMB function. No Computational
import { ADMIN } from "../constants/roles.js";
import ProductService from "../services/productService.js";

const getProducts = async (req, res) => {
  // Request query
  const products = await ProductService.getProduct(req.query);

  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductService.getProductById(id);

    res.status(200).json(product);
  } catch (e) {
    res.status(e.statusCode || 500).send(e.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const data = await ProductService.createProduct(
      req.body,
      req.files,
      req.user._id,
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await ProductService.updateProduct(
      id,
      req.body,
      req.files,
      req.user,
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    await ProductService.deleteProduct(id, req.user);

    res.send(`Product deleted Successfully with id: ${id}`);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getBrand = async (req, res) => {
  try {
    const data = await ProductService.getBrand();

    return res.json(data);
  } catch (error) {
    return res.status(500).send(error?.message);
  }
};

const getCategory = async (req, res) => {
  try {
    const data = await ProductService.getCategory();

    return res.json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getTotalCount = async (req, res) => {
  try {
    const data = await ProductService.getTotalCount();

    return res.json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getBrand,
  getCategory,
  getTotalCount,
};
