// src/utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7157/api', // Ensure the correct base URL
});

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        const refreshToken = localStorage.getItem('refreshToken');
        const userRole = localStorage.getItem('userRole'); // Assuming you store the role after login
  
        let refreshUrl;
        switch (userRole) {
          case 'Admin':
            refreshUrl = "/api/Admin/refresh-token";
            break;
          case 'Dentist':
            refreshUrl = "/api/Dentist/refresh-token";
            break;
          case 'Patient':
            refreshUrl = "/api/Patient/refresh-token";
            break;
          default:
            return Promise.reject(error); // Unknown role, cannot refresh
        }
  
        if (refreshToken) {
          try {
            const response = await axios.post(refreshUrl, { refreshToken });
  
            if (response.status === 200) {
              const { token1 } = response.data; // Keep using token1
  
              // Store new token1
              localStorage.setItem('token1', token1);
              originalRequest.headers['Authorization'] = `Bearer ${token1}`;
  
              return instance(originalRequest); // Retry the original request with the new token1
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            return Promise.reject(refreshError);
          }
        }
      }
  
      return Promise.reject(error);
    }
  );
  export default instance;