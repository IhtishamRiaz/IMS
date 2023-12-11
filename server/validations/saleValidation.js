import Joi from "joi";

const NewItemValidation = Joi.object({
   product: Joi.string().required().label('Product'),
   boxes: Joi.number().required().label('Boxes'),
   cartons: Joi.number().required().label('Cartons'),
   totalQty: Joi.number().required().label('Total Quantity'),
   discount: Joi.number().required().label('Discount'),
   discountType: Joi.string().required().label('Discount Type'),
   scheme: Joi.number().required().label('Scheme'),
   schemeUnit: Joi.string().required().label('Scheme Unit'),
   rate: Joi.number().required().label('Rate'),
   total: Joi.number().required().label('Total'),
})

const validateNewSale = Joi.object({
   adjustment: Joi.number().required().label('Adjustment'),
   adjustmentSource: Joi.string().required().label('Adjustment Source'),
   discountAmount: Joi.number().required().label('Discount Amount'),
   subTotal: Joi.number().required().label('Sub Total'),
   grandTotal: Joi.number().required().label('Grand Total'),
   supplier: Joi.string().required().label('Supplier'),
   remarks: Joi.string().label('Remarks'),
   items: Joi.array().items(NewItemValidation).label('Items')
})

export { validateNewSale }