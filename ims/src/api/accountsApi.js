import { axiosPrivate } from './axios.js'
import { toast } from 'react-hot-toast';

// Add Account
const addAccount = async (data) => {
    axiosPrivate
        .post('/accounts', data)
        .then(res => {
            toast.success(res?.data?.message);
        })
        .catch((error) => {
            toast.error(error?.response?.data?.message);
        })
}

// Add Account Type
const addAccountType = async (data) => {
    axiosPrivate
        .post('/accountType', data)
        .then(res => {
            toast.success(res?.data?.message);
        })
        .catch((error) => {
            toast.error(error?.response?.data?.message);
        })
}

// Get All Account Types
const getAllAccountTypes = async () => {
    const response = await axiosPrivate.get('/accountType')
    return response.data
}

export { addAccount, addAccountType, getAllAccountTypes }