import { redirectToLogin, simpleRedirectToLogin } from './RouterService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

let hasUnauthorizedError = false;

const applyResponseInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('📥 Response:', {
        data: response.data,
        url: response.config?.url,
        status: response.status,
      });

      return response;
    },
    async (error) => {
      const status = error?.response?.status;
      const errorData = error?.response?.data;
      const requestURL = error?.config?.url;

      console.error('🚨 Response Error:', {
        status,
        url: requestURL,
        error: errorData || error.message,
      });

      // Kiểm tra lỗi mạng
      if (error.message === 'Network Error') {
        console.warn('📡 Không có kết nối mạng!');
        Alert.alert(
          'Lỗi mạng',
          'Không có kết nối mạng. Vui lòng kiểm tra kết nối Internet của bạn và thử lại.',
          [{ text: 'OK' }],
        );
        return Promise.reject(error);
      }

      if (status === 401) {
        // Tránh nhiều lỗi 401 gây ra nhiều thông báo
        if (hasUnauthorizedError) {
          console.log('🚫 Đã có lỗi 401 đang xử lý, bỏ qua');
          return Promise.reject(error);
        }

        hasUnauthorizedError = true; // Đánh dấu đã xử lý lỗi 401

        // Kiểm tra message để xác định loại lỗi 401
        let reason = 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.';

        // Kiểm tra nếu là lỗi đăng nhập ở thiết bị khác
        if (errorData?.message && errorData.message.includes('không hợp lệ')) {
          reason =
            'Tài khoản của bạn đã được đăng nhập từ thiết bị khác. Vui lòng đăng nhập lại.';
        }

        console.warn('🔒 Unauthorized! Redirecting to login...', reason);

        // Xóa token ngay lập tức
        try {
          await AsyncStorage.removeItem('authToken');
          console.log('🗑️ Token đã được xóa từ AsyncStorage');

          // Đánh dấu cần chuyển hướng (phòng hờ redirectToLogin không hoạt động)
          await AsyncStorage.setItem('NEED_REDIRECT_TO_LOGIN', 'true');
        } catch (storageError) {
          console.error('Lỗi khi xử lý AsyncStorage:', storageError);
        }

        // Thử phương pháp đơn giản nhất
        simpleRedirectToLogin();

        // Reset flag
        setTimeout(() => {
          hasUnauthorizedError = false;
        }, 3000);
      }

      return Promise.reject(error);
    },
  );
};

export default applyResponseInterceptor;
