// RouterService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';

// Biến toàn cục để lưu trữ router instance
let routerInstance = null;
let isRedirecting = false;

// Hàm để set router instance
export const setRouter = (router) => {
  routerInstance = router;
  console.log('✅ Router instance set:', !!routerInstance);
};

// Hàm chuyển hướng đến trang login
export const redirectToLogin = async (reason = 'Phiên đăng nhập hết hạn') => {
  console.log('🔒 Bắt đầu redirectToLogin với lý do:', reason);
  
  // Ngăn nhiều lần chuyển hướng
  if (isRedirecting) {
    console.log('🚫 Đang trong quá trình chuyển hướng, bỏ qua');
    return;
  }
  
  isRedirecting = true;
  
  try {
    // Xóa token từ AsyncStorage
    await AsyncStorage.removeItem('authToken');
    console.log('🗑️ Token đã được xóa từ AsyncStorage');
  } catch (error) {
    console.error('❌ Lỗi khi xóa token:', error);
  }
  
  // Hiển thị thông báo dựa trên platform
  if (Platform.OS === 'web') {
    // Trên web, hiển thị alert và chuyển hướng ngay
    alert(reason);
    console.log('🌐 Đã hiển thị alert trên web, chuyển hướng...');
    
    // Chuyển hướng trực tiếp bằng window.location
    window.location.href = '/login';
  } else {
    // Trên mobile, hiển thị Alert.alert
    console.log('📱 Hiển thị Alert.alert trên mobile');
    Alert.alert(
      'Phiên đăng nhập không hợp lệ',
      reason,
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('✅ Người dùng nhấn OK, chuyển hướng...');
            
            // Thử nhiều cách chuyển hướng
            try {
              if (routerInstance) {
                // Cách 1: Sử dụng router.replace
                console.log('Thử router.replace...');
                routerInstance.replace('/login');
              } else {
                console.error('⚠️ Router không có sẵn!');
                
                // Cách 2: Sử dụng AsyncStorage để đánh dấu cần chuyển hướng
                AsyncStorage.setItem('NEED_REDIRECT_TO_LOGIN', 'true')
                  .then(() => console.log('Đã đánh dấu cần chuyển hướng'))
                  .catch(err => console.error('Lỗi khi đánh dấu:', err));
              }
            } catch (error) {
              console.error('❌ Lỗi khi chuyển hướng:', error);
            } finally {
              isRedirecting = false;
            }
          },
        },
      ],
      { cancelable: false }
    );
  }
  
  // Reset flag sau 5 giây để tránh trường hợp bị kẹt
  setTimeout(() => {
    isRedirecting = false;
  }, 5000);
};

// Hàm chuyển hướng đơn giản nhất
export const simpleRedirectToLogin = () => {
  // Xóa token
  AsyncStorage.removeItem('authToken')
    .then(() => console.log('Token đã được xóa'))
    .catch(err => console.error('Lỗi khi xóa token:', err));
  
  // Đặt URL đích vào localStorage
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('redirectUrl', '/login');
  }
  
  // Reload trang
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
};

// Kiểm tra và thực hiện chuyển hướng sau khi trang tải
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  const redirectUrl = localStorage.getItem('redirectUrl');
  if (redirectUrl) {
    localStorage.removeItem('redirectUrl');
    window.location.href = redirectUrl;
  }
}
