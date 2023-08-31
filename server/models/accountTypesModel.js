import mongoose from 'mongoose';

const accountTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const AccountType = mongoose.model('AccountType', accountTypeSchema);

export default AccountType