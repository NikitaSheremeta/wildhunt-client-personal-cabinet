import axios from 'axios';
import { magicNumbers } from '../utils/magic-numbers';

const $api = axios.create({ withCredentials: true });

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === magicNumbers.UNAUTHORIZED &&
      error.config &&
      !error.config.isRetry
    ) {
      originalRequest.isRetry = true;

      try {
        const { data: response } = await axios.get('/lk-api/refresh', {
          withCredentials: true
        });

        localStorage.setItem('token', response.data.accessToken);

        return $api.request(originalRequest);
      } catch (err) {
        console.log('[interceptors.response]: ' + err.message);
      }
    }

    throw error;
  }
);

export default $api;
