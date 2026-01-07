const Product = require('../models/productModel')

// GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
      ? {
          name: { $regex: req.query.keyword, $options: 'i' },
        }
      : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/products/top
exports.getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
