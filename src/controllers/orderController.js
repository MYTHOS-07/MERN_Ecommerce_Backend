import orderService from "../services/orderService.js";

const getOrder = async (req, res) => {
  const status = req.query?.status;
  try {
    const data = await orderService.getOrder(status);

    res.json(data);
  } catch (e) {
    res.status(e.statusCode || 500).send(e.message);
  }
};

const getOrdersByUser = async (req, res) => {
  const status = req.query?.status;
  try {
    const data = await orderService.getOrdersByUser(status, req.user._id);

    res.json(data);
  } catch (e) {
    res.status(e.statusCode || 500).send(e.message);
  }
};

const getOrdersById = async (req, res) => {
  try {
    const data = await orderService.getOrderById(req.params.id);

    res.json(data);
  } catch (e) {
    res.status(e.statusCode || 500).send(e.message);
  }
};

const createOrder = async (req, res) => {
  const input = req.body;

  if (!input.orderItems || !input.orderItems.length)
    return res.status(400).send("Order items are required");

  try {
    const data = await orderService.createOrder(req.body, req.user._id);

    res.json(data);
  } catch (e) {
    res.status(e.statusCode || 500).send(e.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const data = await orderService.updateOrderStatus(
      req.params.id,
      req.body?.status,
    );

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const cancelOrder = async (req, res) => {

  try {
    const data = await orderService.cancelOrder(req.params.id, req.user);



    res.status(201).json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrder(req.params.id, req.user);

    return res.send("Order Deleted successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

//payment
const orderPaymentViaKhalti = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await orderService.orderPaymentViaKhalti(id, req.user);

    res.json(data);
  } catch (e) {
    res.status(e.statusCode || 500).send(e.message);
  }
};

const orderPaymentViaStripe = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await orderService.orderPaymentViaStripe(id, req.user);

    res.json(data);
  } catch (e) {
    res.status(e.statusCode || 500).send(e.message);
  }
};

const orderPaymentViaCash = async (req, res) => {
  try {
    const data = await orderService.orderPaymentViaCash(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error?.message);
  }
};

const confirmOrderPayment = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await orderService.confirmOrderPayment(
      id,
      req.body.status,
      req.user,
    );

    res.json(data);
  } catch (e) {
    res.status(e.statusCode || 500).send(e.message);
  }
};

const getOrdersOfMerchant = async (req, res) => {
  const status = req.query?.status;

  try {
    const data = await orderService.getOrdersByMerchant(req.user._id, status);

    res.json(data);
  } catch (e) {
    res.status(e.statusCode || 500).send(e.message);
  }
};

export default {
  getOrder,
  createOrder,
  deleteOrder,
  getOrdersByUser,
  getOrdersById,
  updateOrderStatus,
  cancelOrder,
  // payment
  orderPaymentViaStripe,
  orderPaymentViaCash,
  orderPaymentViaKhalti,
  confirmOrderPayment,
  getOrdersOfMerchant,
};
