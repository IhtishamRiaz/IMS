import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  SPrice: {
    type: Number,
    required: true
  },
  PPrice: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: false
  },
  packingType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PackingType',
    required: true
  },
  packingSize: {
    type: Number
  }
}, { timestamps: true })

// Product Category Schema
const ProductCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})
// Packing Type Schema
const PackingTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

const Product = mongoose.model("Product", productSchema)
const ProductCategory = mongoose.model("ProductCategory", ProductCategorySchema)
const PackingType = mongoose.model("PackingType", PackingTypeSchema)

export { Product, ProductCategory, PackingType }