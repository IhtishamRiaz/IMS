import mongoose from 'mongoose'
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

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

accountSchema.plugin(AutoIncrement, {
  inc_field: 'accountId',
  id: 'accountIDs',
  start_seq: 1
})

const Account = mongoose.model('Account', accountSchema)

export default Account