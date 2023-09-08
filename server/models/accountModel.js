import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  accountId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true
  },
  accountType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountType',
    required: true
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  salesRep: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: false
  },
  isSalesman: {
    type: Boolean,
    required: false
  }
}, { timestamps: true })

const Account = mongoose.model('Account', accountSchema)

export default Account