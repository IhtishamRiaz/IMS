import mongoose from "mongoose"

// Define the Item schema
const ItemSchema = new mongoose.Schema({
   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
   boxes: { type: Number, required: true },
   cartons: { type: Number, required: true },
   totalQty: { type: Number, required: true },
   discount: { type: Number, required: true },
   discountType: { type: String, required: true },
   scheme: { type: Number, required: true },
   schemeUnit: { type: String, required: true },
   rate: { type: Number, required: true },
   total: { type: Number, required: true },
}, { timestamps: true });

// Define the Purchase schema
const PurchaseSchema = new mongoose.Schema({
   purchaseId: { type: Number, required: true, unique: true },
   adjustment: { type: Number, required: true },
   adjustmentSource: { type: String, required: true },
   discountAmount: { type: Number, required: true },
   subTotal: { type: Number, required: true },
   grandTotal: { type: Number, required: true },
   supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
   remarks: { type: String },
   items: { type: [ItemSchema], required: true },
}, { timestamps: true });

const Purchase = mongoose.model("Purchase", PurchaseSchema)

export { Purchase }