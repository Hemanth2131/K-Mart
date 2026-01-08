const Product = require('../models/productModel');

// ✅ CREATE
exports.createProduct = async (req, res) => {
exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: Number(req.body.price),
      countInStock: Number(req.body.countInStock),
      category: req.body.category,
      image: req.body.image || '',
      user: req.user.id,
    });

    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({
      message: 'Product creation failed',
      error: error.message,
    });
  }
};

// ✅ UPDATE
exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  product.countInStock = req.body.countInStock || product.countInStock;
  product.category = req.body.category || product.category;
  product.image = req.body.image || product.image;

  const updated = await product.save();
  res.json(updated);
};

// ✅ DELETE
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await product.deleteOne();
  res.json({ message: 'Product deleted' });
};
