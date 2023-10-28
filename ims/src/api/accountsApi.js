import { axiosPrivate } from './axios.js'
import { toast } from 'sonner';

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


export { addAccount }