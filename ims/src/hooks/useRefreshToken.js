import axios from '../api/axios';
import useMyContext from './useMyContext.js';

const useRefreshToken = () => {
    const { setAuth } = useMyContext();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });

        setAuth((prevState) => {
            console.log("🚀 ~ file: useRefreshToken.js:13 ~ setAuth ~ prevState:", prevState);
            console.log(response.data.accessToken);
            return { ...prevState, accessToken: response.data.accessToken }
        });

        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;