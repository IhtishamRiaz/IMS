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