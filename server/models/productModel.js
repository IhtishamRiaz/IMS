import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: true
  }
}, { timestamps: true })

const ProductCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

const Product = mongoose.model("Product", productSchema)
const ProductCategory = mongoose.model("ProductCategory", ProductCategorySchema)

export { Product, ProductCategory }