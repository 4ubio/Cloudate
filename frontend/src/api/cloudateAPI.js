import axios from 'axios';

const cloudateAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

cloudateAPI.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
});

export default cloudateAPI;