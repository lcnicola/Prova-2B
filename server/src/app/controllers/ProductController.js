const { Model } = require('mongoose');
const Product = require('../models/Product');

class ProductController {
  async create(req, res) {
    const { name, price, description, expiration } = req.body;

    try {
      const createdProduct = await Product.create({ name, price, description, expiration });

      return res.status(200).json(createdProduct);
    } catch(err) {
      return res.status(400).json(err);
    }
  }

  async delete(req, res) {
    const { _id } = req.params;

    try {
      const deleted = await Product.deleteOne({ _id });

      return res.status(200).json(deleted);
    } catch(err) {
      return res.status(400).json(err);
    }
  }

  async index(req, res) {
    try {
      const products = await Product.find();

      return res.status(200).json(products);
    } catch(err) {
      return res.status(400).json(err);
    }
  }

  async show(req, res) {
    const { _id } = req.params;

    try {
      const product = await Product.findOne({ _id });

      return res.status(200).json(product);
    } catch(err) {
      return res.status(400).json(err);
    }
  }

  async update(req, res) {
    const { _id } = req.params;
    const product = await Product.findOne({ _id });
    const updateProduct = {
      ...product['_doc'],
      ...req.body
    }

    try {
      const updated = await Product.update({ _id }, updateProduct).exec();

      return res.status(200).json(updated);
    } catch(err) {
      return res.status(400).json(err);
    }
  }
}

module.exports = new ProductController();