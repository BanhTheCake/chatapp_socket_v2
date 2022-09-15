import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token') || '';
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (res) => {
        if (res && res.data) {
            return res.data;
        }
        return res;
    },
    async (err) => {
        if (
            err.response?.status === 401 &&
            err.response?.data?.message === 'jwt expired'
        ) {
            axios.defaults.withCredentials = true;
            const res = await axios.get(
                'https://chatappsocketbackend.onrender.com/auth/refreshAccessToken'
            );
            const token = res.data.token;

            if (!token) {
                return err
            };
            
            localStorage.setItem('token', token);
            return axiosClient(err.config);
        }
        console.log(err);
    }
);

export default axiosClient;
