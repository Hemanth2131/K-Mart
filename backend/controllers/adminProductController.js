const Product = require('../models/productModel');

// =======================
// CREATE PRODUCT
// =======================
exports.createProduct = async (req, res) => {
  try {
    const { name, price, countInStock, category, image } = req.body;

    if (!name || !price || !countInStock || !category) {
      return res.status(400).json({
        message: 'Please provide all required fields',
      });
    }

    const product = new Product({
      name,
      price: Number(price),
      countInStock: Number(countInStock),
      category,
      image: image || '',
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create product error:', error.message);
    res.status(500).json({
      message: 'Product creation failed',
      error: error.message,
    });
  }
};

// =======================
// UPDATE PRODUCT
// =======================
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = req.body.name || product.name;
    product.price =
      req.body.price !== undefined ? Number(req.body.price) : product.price;
    product.countInStock =
      req.body.countInStock !== undefined
        ? Number(req.body.countInStock)
        : product.countInStock;
    product.category = req.body.category || product.category;
    product.image = req.body.image || product.image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error.message);
    res.status(500).json({
      message: 'Product update failed',
      error: error.message,
    });
  }
};

// =======================
// DELETE PRODUCT
// =======================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error.message);
    res.status(500).json({
      message: 'Product deletion failed',
      error: error.message,
    });
  }
};
