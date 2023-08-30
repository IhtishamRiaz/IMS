import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  isSalesman: {
    type: Boolean,
  },
  salesRep: {
    type: String,
  }
}, { timestamps: true })

const Account = mongoose.model('Account', accountSchema)

export default Account