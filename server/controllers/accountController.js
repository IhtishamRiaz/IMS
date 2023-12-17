import { Account, AccountType } from '../models/accountModel.js'
import { validateNewAccount, validateUpdateAccount } from '../validations/accountValidator.js'
import { validateAccountType } from '../validations/accountValidator.js'

async function getNextAccountId() {
   const maxAccount = await Account.findOne({}, {}, { sort: { accountId: -1 } });
   if (maxAccount) {
      return maxAccount.accountId + 1;
   }
   return 1;
}

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

      const nextAccountId = await getNextAccountId();

      const { name, mobile, accountType, city, salesRep, isSalesman } = req.body
      const lowerCaseName = name.toLowerCase()


      const accountExists = await Account.findOne({ name: lowerCaseName }).lean().exec()
      if (accountExists) {
         return res.status(409).json({ message: 'Account Already Exists!' })
      }

      const accountTypeRec = await AccountType.findById(accountType).lean().exec()

      const accountObject = {
         accountId: nextAccountId,
         name: lowerCaseName,
         balance: 0,
         mobile,
         accountType,
         city
      }

      if (isSalesman && accountTypeRec.name === 'staff') {
         accountObject.isSalesman = isSalesman
      } else {
         accountObject.isSalesman = false
      }

      if (accountTypeRec.name === 'customer' && salesRep) {
         accountObject.salesRep = salesRep
      }

      const account = await Account.create(accountObject)

      if (account) {
         return res.status(201).json({ message: `New Account ${account?.name} Added!` })
      } else {
         return res.status(400).json({ message: 'Failed to Add Account!' })
      }

   } catch (error) {
      return res.status(500).json({ message: 'Failed to Add Account!', error })
   }
}

// @desc Get all Accounts
// @route GET /account
// @access Private
const getAllAccounts = async (req, res) => {
   try {
      const accounts = await
         Account
            .find({})
            .populate('accountType')
            .populate({ path: 'city', populate: { path: 'area' } })
            .populate('salesRep')
            .lean()
            .exec()

      if (!accounts || accounts.length === 0) {
         return res.status(400).json({ message: 'No Account Found!' })
      }

      res.json(accounts);
   } catch (error) {
      res.status(500).json({ message: 'Could not get Accounts', error })
   }
}

// @desc Update Account
// @route PUT /account
// @access Private
const updateAccount = async (req, res) => {
   try {
      // Validating incoming data
      const { error } = validateUpdateAccount(req.body);
      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }

      const { id, name, mobile, accountType, city, salesRep, isSalesman } = req.body
      const lowerCaseName = name.toLowerCase()

      const accountExists = await Account.findById(id).lean().exec()

      if (!accountExists) {
         return res.status(409).json({ message: 'Invalid Id' })
      }

      const accountTypeRec = await AccountType.findById(accountType).lean().exec()

      const accountObject = {
         name: lowerCaseName,
         mobile,
         accountType,
         city
      }

      if (isSalesman && accountTypeRec.name === 'staff') {
         accountObject.isSalesman = isSalesman
      } else {
         accountObject.isSalesman = false
      }

      if (accountTypeRec.name === 'customer' && salesRep) {
         accountObject.salesRep = salesRep
      } else {
         accountObject.$unset = { salesRep: 1 };
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
      const id = req.params.id

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

// @desc Add new Account Type
// @route POST /accountType
// @access Private
const addAccountType = async (req, res) => {
   try {
      // Validating incoming data
      const { error } = validateAccountType(req.body);
      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }

      const { name } = req.body
      const lowerCaseName = name.toLowerCase();

      const accountTypeExists = await AccountType.findOne({ name: lowerCaseName })
      if (accountTypeExists) {
         return res.status(409).json({ message: 'Account Type Already Exists!' })
      }

      const accountTypeObject = {
         name: lowerCaseName
      }

      const accountType = await AccountType.create(accountTypeObject);

      if (accountType) {
         return res.status(201).json({ message: `New Account Type ${accountType?.name} Added!` })
      } else {
         return res.status(400).json({ message: 'Failed to Add Account Type!' })
      }

   } catch (error) {
      res.status(500).json({ message: 'Failed to Add Account Type!', error })
   }
}

// @desc Get All Account Types
// @route GET /accountType
// @access Private
const getAllAccountTypes = async (req, res) => {
   try {
      const accountTypes = await AccountType.find({}).lean()

      if (!accountTypes || accountTypes.length === 0) {
         return res.status(400).json({ message: 'No Account Type Found!' })
      }

      res.json(accountTypes);
   } catch (error) {
      res.status(500).json({ message: 'Could not get Account Types', error })
   }
}

// @desc Delete Account Types
// @route DELETE /accountType
// @access Private
const deleteAccountType = async (req, res) => {
   try {
      const id = req.params.id

      const accountType = await AccountType.findById(id)

      if (!accountType) {
         return res.status(400).json({ message: 'Account Type Not Found!' })
      }

      const deletedAccountType = await AccountType.findByIdAndDelete(id)

      if (deletedAccountType) {
         return res.status(201).json({ message: `Account Type ${accountType?.name} Deleted!` })
      } else {
         return res.status(400).json({ message: 'Failed to Delete Account Type!' })
      }

   } catch (error) {
      res.status(500).json({ message: 'Could not delete Account Types', error })
   }
}


export { addAccount, getAllAccounts, updateAccount, deleteAccount, addAccountType, getAllAccountTypes, deleteAccountType }