import * as questionService from '../services/question.service.js';

export const getQuestion = async (req, res) => {
    try {
        const sortOrder = req.query.sortOrder || 'ASC';
        const search = req.query.search || '';
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        const result = await questionService.getAllQuestions(search, page, limit, sortOrder);

        return res.status(200).json({
            message: 'Lấy danh sách câu hỏi thành công',
            ...result,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const questionDetail = await questionService.getQuestionById(id);

        return res.status(200).json({
            message: 'Chi tiết câu hỏi kèm đáp án',
            data: questionDetail,
        });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getQuestionByExamId = async (req, res) => {
    try {
        const { examId } = req.params;
        const questions = await questionService.getQuestionsByExamId(examId);

        return res.status(200).json({
            message: "Lấy danh sách câu hỏi thành công!",
            data: questions,
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const postQuestion = async (req, res) => {
    try {
        const { questionData, statementOptions, examId } = JSON.parse(req.body.data);
        const files = {
            questionImage: req.files?.questionImage?.[0],
            solutionImage: req.files?.solutionImage?.[0],
            statementImages: req.files?.statementImages || []
        };

        const result = await questionService.createQuestion(questionData, statementOptions, examId, files);

        return res.status(201).json({
            message: "Thêm câu hỏi thành công!",
            ...result,
        });

    } catch (error) {
        console.error("Lỗi khi thêm câu hỏi:", error);
        return res.status(500).json({ message: error.message });
    }
}

export const putQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { questionData, statements } = req.body;

        const updatedQuestion = await questionService.updateQuestion(id, questionData, statements);

        return res.status(200).json({
            message: "Cập nhật câu hỏi và mệnh đề thành công!",
            data: updatedQuestion,
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật câu hỏi:", error);
        return res.status(500).json({ message: error.message });
    }
};


export const putQuestionImage = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await questionService.updateQuestionImage(id, req.file);

        return res.status(200).json({
            message: 'Cập nhật ảnh câu hỏi thành công.',
            ...result,
        });

    } catch (error) {
        console.error('Lỗi khi cập nhật ảnh câu hỏi:', error);
        return res.status(500).json({ message: error.message });
    }
}

export const putQuestionSolutionImage = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await questionService.updateQuestionSolutionImage(id, req.file);

        return res.status(200).json({
            message: 'Cập nhật ảnh câu hỏi lời giải thành công.',
            ...result,
        });

    } catch (error) {
        console.error('Lỗi khi cập nhật ảnh câu hỏi:', error);
        return res.status(500).json({ message: error.message });
    }
}


export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        await questionService.deleteQuestion(id);

        return res.status(200).json({ message: 'Xóa câu hỏi thành công' });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const deleteQuestionImage = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await questionService.deleteQuestionImage(id);

        return res.status(200).json({
            message: 'Xóa ảnh câu hỏi thành công.',
            ...result
        });
    } catch (error) {
        console.error('Lỗi khi xóa ảnh câu hỏi:', error);
        return res.status(500).json({ message: error.message });
    }
}

