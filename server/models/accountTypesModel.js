import mongoose from 'mongoose';

const accountTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

const AccountType = mongoose.model('AccountTypes', accountTypeSchema);

export default AccountType