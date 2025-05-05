import api from "./api";

// User API
export const postQuestionReportAPI = async ({ reportData }) => {
    return await api.post(`/v1/user/question-report`, reportData);
}

// Admin API
/**
 * Lấy danh sách tất cả báo cáo câu hỏi
 * @param {Object} params - Các tham số truy vấn (pagination, filter, etc.)
 * @returns {Promise} - Promise chứa kết quả trả về từ API
 */
export const getQuestionReportsAPI = async (params = {}) => {
    return await api.get('/v1/admin/question-report', { params });
}

/**
 * Lấy thông tin chi tiết của một báo cáo câu hỏi theo ID
 * @param {string} id - ID của báo cáo câu hỏi
 * @returns {Promise} - Promise chứa kết quả trả về từ API
 */
export const getQuestionReportByIdAPI = async (id) => {
    return await api.get(`/v1/admin/question-report/${id}`);
}

/**
 * Xóa một báo cáo câu hỏi theo ID
 * @param {string} id - ID của báo cáo câu hỏi
 * @returns {Promise} - Promise chứa kết quả trả về từ API
 */
export const deleteQuestionReportAPI = async (id) => {
    return await api.delete(`/v1/admin/question-report/${id}`);
}