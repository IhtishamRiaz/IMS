import AccountType from '../models/accountTypesModel.js'

// @desc Add new Account Type
// @route POST /accountType
// @access Private
const addAccountType = async (req, res) => {
    try {
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
        const { accountTypeID } = req.body
        const accountType = await AccountType.findById(accountTypeID)
        if (!accountType) {
            return res.status(400).json({ message: 'Account Type Not Found!' })
        }
        await AccountType.findByIdAndDelete(accountTypeID)
        res.status(200).json({ message: `Account Type ${accountType?.name} Deleted!` })
    } catch (error) {
        res.status(500).json({ message: 'Could not delete Account Types', error })
    }
}


export { addAccountType, getAllAccountTypes, deleteAccountType }