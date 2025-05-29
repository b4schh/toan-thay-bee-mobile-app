import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  useEffect(() => {
    // Kiểm tra cờ chuyển hướng mỗi 2 giây
    const checkRedirectFlag = async () => {
      try {
        const needRedirect = await AsyncStorage.getItem('NEED_REDIRECT_TO_LOGIN');
        if (needRedirect === 'true') {
          console.log('Phát hiện cờ chuyển hướng trong App.js');
          await AsyncStorage.removeItem('NEED_REDIRECT_TO_LOGIN');
          
          // Chuyển hướng bằng cách reset toàn bộ state
          if (window.location) {
            window.location.href = '/login';
          }
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra cờ chuyển hướng:', error);
      }
    };
    
    const intervalId = setInterval(checkRedirectFlag, 2000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // ... phần còn lại của component
}
