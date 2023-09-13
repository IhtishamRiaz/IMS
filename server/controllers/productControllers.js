import Product from '../models/productModel.js'
import { validateNewProduct } from '../validations/productValidator.js'


async function getNextProductId() {
  const maxProduct = await Product.findOne({}, {}, { sort: { productId: -1 } });
  if (maxProduct) {
    return maxProduct.productId + 1;
  }
  return 1;
}