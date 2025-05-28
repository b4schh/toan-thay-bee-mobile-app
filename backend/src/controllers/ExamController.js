import * as examService from '../services/exam.service.js';

export const getExam = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortOrder = req.query.sortOrder || "DESC";

    const result = await examService.getAllExams(search, page, limit, sortOrder);

    return res.status(200).json({
      message: "Danh sách đề",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const getNewestExam = async (req, res) => {
  try {
    const exams = await examService.getNewestExams(3);

    res.status(200).json({
      message: "Danh sách đề mới nhất",
      data: exams,
    });
  } catch (error) {
    console.error("Lỗi khi lấy đề mới:", error);
    res.status(500).json({ message: "Lỗi server khi lấy đề mới nhất" });
  }
};

export const getExamPublic = async (req, res) => {
  try {
    const userId = req.user.id;
    const search = req.query.search || "";
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortOrder = req.query.sortOrder || "DESC";

    // Parse filters
    const classFilter = req.query.grade; // single value
    const typeOfExamFilters = Array.isArray(req.query.typeOfExam)
      ? req.query.typeOfExam
      : req.query.typeOfExam
      ? [req.query.typeOfExam]
      : [];
    const chapterFilters = Array.isArray(req.query.chapter)
      ? req.query.chapter
      : req.query.chapter
      ? [req.query.chapter]
      : [];

    const filters = {
      classFilter,
      typeOfExamFilters,
      chapterFilters,
    };

    const result = await examService.getPublicExams(userId, search, page, limit, sortOrder, filters);

    return res.status(200).json({
      message: "Danh sách đề",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// examHandlers.js
export const submitExam = async (socket, attemptId) => {
  try {
    console.log("📝 Nộp bài:", attemptId);
    const result = await examService.submitExam(attemptId);

    socket.emit("exam_submitted", result);
  } catch (err) {
    console.error("Lỗi submit_exam:", err);
    socket.emit("submit_error", {
      message: err.message,
    });
  }
};

export const getExamPublicById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const examDetail = await examService.getPublicExamById(id, userId);

    return res.status(200).json({
      message: "Chi tiết đề",
      data: examDetail,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getQuestionByExamId = async (req, res) => {
  try {
    const { examId } = req.params;
    const search = req.query.search || "";
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortOrder = req.query.sortOrder || "desc";

    const result = await examService.getQuestionsByExamId(examId, search, page, limit, sortOrder);

    return res.status(200).json({
      message: "Lấy danh sách câu hỏi thành công!",
      ...result,
    });
  } catch (error) {
    console.error("Lỗi khi lấy câu hỏi theo examId:", error);
    return res.status(400).json({ message: error.message });
  }
};

export const getPublicQuestionByExamId = async (req, res) => {
  try {
    const { examId } = req.params;
    const result = await examService.getPublicQuestionsByExamId(examId);

    return res.status(200).json({
      message: "Lấy danh sách câu hỏi rút gọn thành công!",
      ...result,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const examDetail = await examService.getExamById(id);

    return res.status(200).json({
      message: "Chi tiết đề",
      data: examDetail,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const postExam = async (req, res) => {
  try {
    const { examData, questions } = JSON.parse(req.body.data);
    const files = {
      examImage: req.files?.examImage?.[0],
      questionImages: req.files?.questionImages || [],
      statementImages: req.files?.statementImages || []
    };

    const result = await examService.createExam(examData, questions, files);

    return res.status(201).json({
      message: "Thêm đề thi thành công!",
      ...result,
    });
  } catch (error) {
    console.error("Lỗi khi thêm đề thi:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const putExam = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExam = await examService.updateExam(id, req.body);

    return res.status(200).json({
      message: "Cập nhật đề thi thành công",
      data: updatedExam
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const putImageExam = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await examService.updateExamImage(id, req.file);

    return res.status(200).json({
      message: "Cập nhật ảnh đề thi thành công",
      ...result,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật ảnh đề thi:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const saveExamForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { examId } = req.body;

    const result = await examService.saveExamForUser(userId, examId);

    return res.status(200).json({
      message: "Thành công.",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getSavedExams = async (req, res) => {
  try {
    const { id } = req.user;
    const savedExams = await examService.getSavedExams(id);

    return res.status(200).json({
      message: "Lấy danh sách đề thi đã lưu thành công",
      data: savedExams,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadSolutionPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const solutionPdfUrl = await examService.uploadSolutionPdf(id, req);

    return res.status(200).json({
      message: "Cập nhật file PDF thành công!",
      data: solutionPdfUrl,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật file PDF:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    await examService.deleteExam(id);

    return res.status(200).json({ message: "Xóa đề thi thành công" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getRelatedExams = async (req, res) => {
  try {
    const { examId } = req.params;
    const userId = req.user?.id;
    const limit = 5;

    const formattedExams = await examService.getRelatedExams(examId, userId, limit);

    return res.status(200).json({
      message: "Danh sách đề thi liên quan",
      data: formattedExams,
      total: formattedExams.length,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
