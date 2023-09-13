import { Product, ProductCategory } from '../models/productModel.js'
import { validateNewProduct, validateUpdateProduct, validateProductCategory } from '../validations/productValidator.js'

async function getNextProductId() {
  const maxProduct = await Product.findOne({}, {}, { sort: { productId: -1 } });
  if (maxProduct) {
    return maxProduct.productId + 1;
  }
  return 1;
}

// @desc Add new Product
// @route POST /product
// @access Private
const addProduct = async (req, res) => {
  try {
    // Validating incoming data
    const { error } = validateNewProduct(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const nextProductId = await getNextProductId();

    const { name, price, min, max, category } = req.body
    const lowerCaseName = name.toLowerCase()

    const productObject = {
      productId: nextProductId,
      name: lowerCaseName,
      price,
      min,
      max,
      category
    }

    const product = await Product.create(productObject)

    if (product) {
      return res.status(201).json({ message: `New Product ${product?.name} Added!` })
    } else {
      return res.status(400).json({ message: 'Failed to Add Product!' })
    }

  } catch (error) {
    return res.status(500).json({ message: 'Failed to Add Product!', error })
  }
}

// @desc Get all Products
// @route GET /product
// @access Private
const getAllProducts = async (req, res) => {
  try {
    const products = await
      Product
        .find({})
        .populate('category')
        .lean()
        .exec()

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No Product Found!' })
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Could not get Products', error })
  }
}

// @desc Update Product
// @route PATCH /product
// @access Private
const updateProduct = async (req, res) => {
  try {
    // Validating incoming data
    const { error } = validateUpdateProduct(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id, name, price, min, max, category } = req.body
    const lowerCaseName = name.toLowerCase()

    const productExists = await Product.findById(id).lean().exec()

    if (!productExists) {
      return res.status(409).json({ message: 'Invalid Id' })
    }

    const productObject = {
      name: lowerCaseName,
      price,
      min,
      max,
      category
    }
    const product = await Product.findByIdAndUpdate(id, productObject, { new: true })

    if (product) {
      return res.status(201).json({ message: `Product ${product?.name} Updated!` })
    } else {
      return res.status(400).json({ message: 'Failed to Update Product!' })
    }

  } catch (error) {
    res.status(500).json({ message: 'Could not update Product', error })
  }
}

// @desc Delete Product
// @route DELETE /product
// @access Private
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id

    const product = await Product.findById(id)

    if (!product) {
      return res.status(400).json({ message: 'Product Not Found!' })
    }

    const deletedProduct = await Product.findByIdAndDelete(id)

    if (deletedProduct) {
      return res.status(201).json({ message: `Product ${deletedProduct?.name} Deleted!` })
    } else {
      return res.status(400).json({ message: 'Failed to Delete Product!' })
    }

  } catch (error) {
    res.status(500).json({ message: 'Could not delete Product', error })
  }
}

// @desc Add new Product Category
// @route POST /product/category
// @access Private
const addProductCategory = async (req, res) => {
  try {
    // Validating incoming data
    const { error } = validateProductCategory(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name } = req.body
    const lowerCaseName = name.toLowerCase();

    const categoryExists = await ProductCategory.findOne({ name: lowerCaseName })
    if (categoryExists) {
      return res.status(409).json({ message: 'Category Already Exists!' })
    }

    const categoryObject = {
      name: lowerCaseName
    }

    const category = await ProductCategory.create(categoryObject);

    if (category) {
      return res.status(201).json({ message: `New Category ${category?.name} Added!` })
    } else {
      return res.status(400).json({ message: 'Failed to Add Category!' })
    }

  } catch (error) {
    res.status(500).json({ message: 'Failed to Add Category!', error })
  }
}

// @desc Get All Categories
// @route GET /product/category
// @access Private
const getAllProductCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find({}).lean()

    if (!categories || categories.length === 0) {
      return res.status(400).json({ message: 'No Category Found!' })
    }

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Could not get Categories', error })
  }
}

// @desc Delete Category
// @route DELETE /product/category
// @access Private
const deleteProductCategory = async (req, res) => {
  try {
    const id = req.params.id
    const productCategory = await ProductCategory.findById(id)

    if (!productCategory) {
      return res.status(400).json({ message: 'Category Not Found!' })
    }

    const deletedProductCategory = await ProductCategory.findByIdAndDelete(id)

    if (deletedProductCategory) {
      return res.status(201).json({ message: `Category ${productCategory?.name} Deleted!` })
    } else {
      return res.status(400).json({ message: 'Failed to Delete Category!' })
    }

  } catch (error) {
    res.status(500).json({ message: 'Could not delete Category', error })
  }
}

export { addProduct, getAllProducts, updateProduct, deleteProduct, addProductCategory, getAllProductCategories, deleteProductCategory }