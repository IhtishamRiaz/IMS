import Account from '../models/accountModel.js'
import { validateNewAccount, validateUpdateAccount } from '../validations/accountValidator.js'

// @desc Add new Account
// @route POST /account
// @access Private
const addAccount = async (req, res) => {
  try {
    // Validating incoming data
    const { error } = validateNewAccount(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, mobile, accountType, city, salesRep, isSalesman } = req.body
    const lowerCaseName = name.toLowerCase()

    const accountExists = await Account.findOne({ name: lowerCaseName }).lean().exec()
    if (accountExists) {
      return res.status(409).json({ message: 'Account Already Exists!' })
    }

    const accountObject = {
      name: lowerCaseName,
      mobile,
      accountType,
      city,
      isSalesman
    }

    if (salesRep) {
      accountObject.salesRep = salesRep
    }

    const account = await Account.create(accountObject)

    if (account) {
      return res.status(201).json({ message: `New Account ${account?.name} Added!` })
    } else {
      return res.status(400).json({ message: 'Failed to Add Account!' })
    }

  } catch (error) {
    res.status(500).json({ message: 'Failed to Add Account!', error })
  }
}

// @desc Get all Accounts
// @route GET /account
// @access Private
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({}).populate('accountType').populate('city').populate('salesRep').lean().exec()

    if (!accounts || accounts.length === 0) {
      return res.status(400).json({ message: 'No Account Found!' })
    }

    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Could not get Accounts', error })
  }
}

// @desc Update Account
// @route PATCH /account
// @access Private
const updateAccount = async (req, res) => {
  try {
    // Validating incoming data
    const { error } = validateUpdateAccount(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id, name, mobile, accountType, city } = req.body
    const lowerCaseName = name?.toLowerCase()

    const accountExists = await Account.findOne({ name: lowerCaseName }).lean().exec()

    if (accountExists) {
      return res.status(409).json({ message: 'Account Already Exists!' })
    }

    const accountObject = {
      name: lowerCaseName,
      mobile,
      accountType,
      city
    }

    const account = await Account.findByIdAndUpdate(id, accountObject, { new: true })

    if (account) {
      return res.status(201).json({ message: `Account ${account?.name} Updated!` })
    } else {
      return res.status(400).json({ message: 'Failed to Update Account!' })
    }

  } catch (error) {
    res.status(500).json({ message: 'Could not update Account', error })
  }
}

// @desc Delete Account
// @route DELETE /account
// @access Private
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.body

    const account = await Account.findById(id)

    if (!account) {
      return res.status(400).json({ message: 'Account Not Found!' })
    }

    const deletedAccount = await Account.findByIdAndDelete(id)

    if (deletedAccount) {
      return res.status(201).json({ message: `Account ${deletedAccount?.name} Deleted!` })
    } else {
      return res.status(400).json({ message: 'Failed to Delete Account!' })
    }

  } catch (error) {
    res.status(500).json({ message: 'Could not delete Account', error })
  }
}

export { addAccount, getAllAccounts, updateAccount, deleteAccount }