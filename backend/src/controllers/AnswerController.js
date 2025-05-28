import * as answerService from '../services/answer.service.js';
// AnswerController.js

export const getAnswerById = async (req, res) => {
    try {
        const { id } = req.params;
        const answer = await answerService.getAnswerById(id);

        return res.status(200).json({
            message: 'Lấy thông tin đáp án thành công!',
            data: answer
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};

export const getAnswerByAttempt = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const formatted = await answerService.getAnswersByAttempt(attemptId);

    return res.status(200).json({
      message: "Lấy danh sách đáp án thành công!",
      data: formatted,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const getQuestionsAndAnswersByAttempt = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const data = await answerService.getQuestionsAndAnswersByAttempt(attemptId);

    return res.status(200).json({
      message: "✅ Lấy danh sách câu hỏi và đáp án thành công!",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};

export const postAnswer = async (req, res) => {
  try {
    const answerData = req.body;
    const newAnswer = await answerService.createAnswer(answerData);

    return res.status(201).json({
      message: 'Tạo đáp án thành công!',
      data: newAnswer
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export const putAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedAnswer = await answerService.updateAnswer(id, updateData);

    return res.status(200).json({
      message: 'Cập nhật đáp án thành công!',
      data: updatedAnswer
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    await answerService.deleteAnswer(id);

    return res.status(200).json({
      message: 'Xóa đáp án thành công!'
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message
    });
  }
};

// Bulk operations
export const postBulkAnswers = async (req, res) => {
  try {
    const answersData = req.body.answers;
    const newAnswers = await answerService.createBulkAnswers(answersData);

    return res.status(201).json({
      message: 'Tạo nhiều đáp án thành công!',
      data: newAnswers
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export const putBulkAnswers = async (req, res) => {
  try {
    const answersData = req.body.answers;
    const updatedAnswers = await answerService.updateBulkAnswers(answersData);

    return res.status(200).json({
      message: 'Cập nhật nhiều đáp án thành công!',
      data: updatedAnswers
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export const deleteAnswersByAttempt = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const deletedCount = await answerService.deleteAnswersByAttempt(attemptId);

    return res.status(200).json({
      message: 'Xóa tất cả đáp án của lượt làm bài thành công!',
      deletedCount
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
