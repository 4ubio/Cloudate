import axios from 'axios';
import { getEnvVariables } from '../calendar/helpers/getEnvVariables';

const {VITE_API_URL} = getEnvVariables();

const calendarAPI = axios.create({
    baseURL: VITE_API_URL,
})

calendarAPI.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
});

export default calendarAPI;