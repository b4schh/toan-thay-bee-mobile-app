// api.js
import axios from 'axios';
import Config from 'react-native-config';
import applyRequestInterceptor from './requestInterceptor';
import applyResponseInterceptor from './responseInterceptor';

// Cấu hình retry
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  retryableStatuses: [408, 429, 500, 502, 503, 504, -1], // -1 cho ECONNRESET
};

// Helper function để delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Sử dụng biến môi trường hoặc đặt baseURL mặc định phù hợp với backend của bạn
const baseURL = 'http://192.168.45.154:3000/api';

const api = axios.create({
  baseURL,
  timeout: 10000,
});

console.log(
  '🚀 Axios Instance cho Mobile đã được khởi tạo với baseURL:',
  baseURL,
);

// Thêm interceptor để xử lý retry
api.interceptors.response.use(
  response => response,
  async error => {
    const { config } = error;
    
    // Không retry nếu không có config hoặc đã đạt giới hạn retry
    if (!config || config.retryCount >= RETRY_CONFIG.maxRetries) {
      return Promise.reject(error);
    }

    // Khởi tạo số lần retry
    config.retryCount = config.retryCount || 0;

    // Kiểm tra điều kiện retry
    const shouldRetry = error.code === 'ECONNRESET' || 
                       RETRY_CONFIG.retryableStatuses.includes(error.response?.status);

    if (shouldRetry) {
      config.retryCount += 1;
      console.log(`🔄 Đang thử lại lần ${config.retryCount}/${RETRY_CONFIG.maxRetries} cho request: ${config.url}`);
      
      // Delay trước khi retry
      await delay(RETRY_CONFIG.retryDelay);
      
      // Thực hiện request lại
      return api(config);
    }

    return Promise.reject(error);
  }
);

// Áp dụng interceptor nếu bạn cần xử lý các yêu cầu/phản hồi chung
applyRequestInterceptor(api);
applyResponseInterceptor(api);

export default api;