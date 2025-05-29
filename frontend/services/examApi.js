import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllPublicExamAPI = async (data, token) => {
  if (!token) {
    throw new Error('Bạn cần đăng nhập trước khi lấy danh sách đề thi.');
  }

  // Chuyển đổi currentPage thành page để phù hợp với backend
  // const params = { ...data };
  // if (params.currentPage) {
  //   params.page = params.currentPage;
  //   delete params.currentPage;
  // }

  return api.get('/v1/user/exam', {
    params: data,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getExamById = async ({ examId }, token) => {
  if (!token) {
    throw new Error('Bạn cần đăng nhập trước khi xem chi tiết đề thi.');
  }
  return api.get(`/v1/exams/${examId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSavedExams = async (_, token) => {
  if (!token) {
    throw new Error('Bạn cần đăng nhập trước khi lấy danh sách đề thi.');
  }
  return api.get(`/v1/user/exam/saved`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getExamPublic = ({ id }, token) => {
  return api.get(`/v1/user/exam/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveExamForUserAPI = async ({ examId }, token) => {
  if (!token) {
    throw new Error('Bạn cần đăng nhập trước khi lưu đề thi.');
  }
  return api.post(
    '/v1/user/save-exam',
    { examId },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const submitExamAPI = async ({ attemptId }, token) => {
  if (!token) {
    throw new Error('Bạn cần đăng nhập trước khi nộp bài thi.');
  }
  if (!attemptId) {
    throw new Error('attemptId là bắt buộc.');
  }
  return api.post(
    `/v1/user/exam/submit/${attemptId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};
