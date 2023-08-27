import { axiosPrivate } from './axios.js'

const addAccountType = async (data) => {
    axiosPrivate.post('/accountType', data)
}

export { addAccountType }