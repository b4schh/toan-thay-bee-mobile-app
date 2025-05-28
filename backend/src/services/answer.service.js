// services/answer.service.js
import db from '../models/index.js';

// Query Services
export const getAnswerById = async (id) => {
    const answer = await db.Answer.findByPk(id, {
        include: [
            {
                model: db.Question,
                attributes: ["id", "content", "typeOfQuestion"],
                include: [
                    {
                        model: db.Statement,
                        as: "statements",
                        attributes: ["id", "content", "imageUrl", "isCorrect", "order"],
                    },
                ],
            },
        ],
    });

    if (!answer) {
        throw new Error('Không tìm thấy đáp án!');
    }

    return answer;
};

export const getAnswersByAttempt = async (attemptId) => {
    if (!attemptId) {
        throw new Error('attemptId không hợp lệ!');
    }

    const answers = await db.Answer.findAll({
        where: { attemptId },
        attributes: ["id", "questionId", "answerContent"],
        include: [
            {
                model: db.Question,
                attributes: ["typeOfQuestion"],
            },
        ],
    });

    const formatted = answers.map((answer) => ({
        questionId: answer.questionId,
        answerContent: answer.answerContent,
        typeOfQuestion: answer.Question?.typeOfQuestion || null,
    }));

    return formatted;
};

export const getQuestionsAndAnswersByAttempt = async (attemptId) => {
    if (!attemptId) {
        throw new Error('attemptId không hợp lệ!');
    }

    // Dùng include để lấy cả exam => giảm 1 lần query
    const attempt = await db.StudentExamAttempt.findByPk(attemptId, {
        include: [
            {
                model: db.Exam,
                as: "exam", // phải đúng với alias trong associate
            },
        ],
    });

    if (!attempt) {
        throw new Error('Không tìm thấy lượt làm bài!');
    }

    const answers = await db.Answer.findAll({
        where: { attemptId },
        attributes: [
            "id",
            "questionId",
            "answerContent",
            "result",
            "createdAt",
            "updatedAt",
        ],
        include: [
            {
                model: db.Question,
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                    {
                        model: db.Statement,
                        as: "statements",
                        attributes: ["id", "content", "imageUrl", "isCorrect", "order"],
                    },
                ],
            },
        ],
    });

    const questions = [];
    const questionMap = new Set(); // Tránh bị trùng câu hỏi nếu cùng questionId

    const formattedAnswers = answers.map((answer) => {
        if (answer.Question && !questionMap.has(answer.Question.id)) {
            questions.push(answer.Question);
            questionMap.add(answer.Question.id);
        }

        return {
            id: answer.id,
            typeOfQuestion: answer.Question?.typeOfQuestion,
            questionId: answer.questionId,
            answerContent: answer.answerContent,
            result: answer.result,
        };
    });

    return {
        questions,
        answers: formattedAnswers,
        exam: {
            name: attempt.exam?.name || "Không rõ",
            id: attempt.exam?.id,
        },
        startTime: attempt.startTime,
        endTime: attempt.endTime,
        score: attempt.score,
    };
};

// Answer Management Services
export const createAnswer = async (answerData) => {
    const transaction = await db.sequelize.transaction();

    try {
        const newAnswer = await db.Answer.create(answerData, { transaction });
        await transaction.commit();
        return newAnswer;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const updateAnswer = async (id, updateData) => {
    const transaction = await db.sequelize.transaction();

    try {
        const answer = await db.Answer.findByPk(id, { transaction });
        
        if (!answer) {
            throw new Error('Không tìm thấy đáp án để cập nhật!');
        }

        await answer.update(updateData, { transaction });
        await transaction.commit();
        
        return answer;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const deleteAnswer = async (id) => {
    const transaction = await db.sequelize.transaction();

    try {
        const answer = await db.Answer.findByPk(id, { transaction });
        
        if (!answer) {
            throw new Error('Không tìm thấy đáp án để xóa!');
        }

        await answer.destroy({ transaction });
        await transaction.commit();
        
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Bulk Answer Operations
export const createBulkAnswers = async (answersData) => {
    const transaction = await db.sequelize.transaction();

    try {
        const newAnswers = await db.Answer.bulkCreate(answersData, { 
            transaction,
            validate: true 
        });
        await transaction.commit();
        return newAnswers;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const updateBulkAnswers = async (answersData) => {
    const transaction = await db.sequelize.transaction();

    try {
        const updatedAnswers = [];
        
        for (const answerData of answersData) {
            const { id, ...updateData } = answerData;
            const answer = await db.Answer.findByPk(id, { transaction });
            
            if (answer) {
                await answer.update(updateData, { transaction });
                updatedAnswers.push(answer);
            }
        }

        await transaction.commit();
        return updatedAnswers;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const deleteAnswersByAttempt = async (attemptId) => {
    const transaction = await db.sequelize.transaction();

    try {
        const deletedCount = await db.Answer.destroy({
            where: { attemptId },
            transaction
        });

        await transaction.commit();
        return deletedCount;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
