import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setErrorMessage,
  setLoading,
  setSuccessMessage,
} from '../features/state/stateApiSlice';

export const apiHandler = async (
  dispatch,
  apiFunc,
  params,
  successCallback,
  useSuccessMessage = true,
  setDelay = true,
  returnResponse = false,
) => {
  try {
    dispatch(setLoading(true));

    if (setDelay) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // ✅ Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      throw new Error('🚨 Bạn cần đăng nhập trước khi gọi API.');
    }

    // ✅ Gọi API và tự chèn token
    const response = await apiFunc(params, token);

    if (response.data?.message && useSuccessMessage) {
      dispatch(setSuccessMessage(response.data.message));
    }

    if (successCallback) {
      successCallback(response.data);
    }
    
    if (returnResponse) {
      return response;
    }
    return response.data ? response.data : response;
  } catch (error) {
    const errorMsg = error.response
      ? error.response.data.message
      : error.message;
    console.error('🚨 Có lỗi xảy ra khi gọi API:', errorMsg);
    dispatch(setErrorMessage(errorMsg));
    
    // Ném lỗi để có thể bắt ở các hàm gọi
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};
