// services/question.service.js
import { Op } from 'sequelize';
import db from '../models/index.js';
import { uploadImage, cleanupUploadedFiles } from '../utils/imageUpload.js';

// Query Services
export const getAllQuestions = async (search = '', page = 1, limit = 10, sortOrder = 'ASC') => {
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search.trim() !== '') {
        whereClause = {
            [Op.or]: [
                { content: { [Op.like]: `%${search}%` } },
                { typeOfQuestion: { [Op.like]: `%${search}%` } },
                { chapter: { [Op.like]: `%${search}%` } },
                { difficulty: { [Op.like]: `%${search}%` } },
                { class: { [Op.like]: `%${search}%` } },
                { id: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
            ],
        };
    }

    const [questionList, total] = await Promise.all([
        db.Question.findAll({
            where: whereClause,
            offset,
            limit,
            include: [
                {
                    model: db.Statement,
                    as: 'statements',
                    attributes: ['content', 'order', 'isCorrect', 'imageUrl'],
                },
            ],
            order: [['createdAt', sortOrder]],
        }),
        db.Question.count({ where: whereClause }),
    ]);

    return {
        data: questionList,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
    };
};

export const getQuestionById = async (id) => {
    const questionDetail = await db.Question.findByPk(id, {
        include: [
            {
                model: db.Statement,
                as: 'statements',
                attributes: ['id', 'content', 'isCorrect', 'imageUrl', 'difficulty'],
            },
        ],
    });

    if (!questionDetail) {
        throw new Error('Câu hỏi không tồn tại');
    }

    return questionDetail;
};

export const getQuestionsByExamId = async (examId) => {
    if (!examId) {
        throw new Error('examId không hợp lệ!');
    }

    const exam = await db.Exam.findByPk(examId, {
        include: [
            {
                model: db.Question,
                as: 'questions',
                through: { attributes: [] },
                include: [
                    {
                        model: db.Statement,
                        as: 'statements',
                        attributes: ['id', 'content', 'imageUrl'],
                    },
                ],
                attributes: ['id', 'content', 'typeOfQuestion', 'imageUrl'],
            },
        ],
    });

    if (!exam) {
        throw new Error('Không tìm thấy đề thi!');
    }

    return exam.questions;
};

// Question Management Services
export const createQuestion = async (questionData, statementOptions, examId, files) => {
    const transaction = await db.sequelize.transaction();
    const uploadedFiles = [];

    try {
        const { questionImage, solutionImage, statementImages = [] } = files;

        if (!questionData) {
            throw new Error('Dữ liệu câu hỏi không hợp lệ!');
        }

        // Upload question image
        const questionImageUrl = await uploadImage(questionImage);
        if (questionImageUrl) uploadedFiles.push(questionImageUrl);

        // Upload solution image
        const solutionImageUrl = await uploadImage(solutionImage);
        if (solutionImageUrl) uploadedFiles.push(solutionImageUrl);

        // Create question
        const newQuestion = await db.Question.create(
            {
                ...questionData,
                imageUrl: questionImageUrl,
                solutionImageUrl: solutionImageUrl
            },
            { transaction }
        );

        // Create statements
        let statements = [];
        let imageIndex = 0;

        if (Array.isArray(statementOptions) && statementOptions.length) {
            statements = await Promise.all(
                statementOptions.map(async (statement, index) => {
                    let statementImageUrl = null;

                    if (statement.needImage && statementImages[imageIndex]) {
                        statementImageUrl = await uploadImage(statementImages[imageIndex]);
                        if (statementImageUrl) uploadedFiles.push(statementImageUrl);
                        imageIndex++;
                    }

                    return db.Statement.create(
                        {
                            ...statement,
                            questionId: newQuestion.id,
                            imageUrl: statementImageUrl,
                            order: index + 1
                        },
                        { transaction }
                    );
                })
            );
        }

        // Add to exam if examId provided
        if (examId) {
            const exam = await db.Exam.findByPk(examId, { transaction });
            if (!exam) {
                throw new Error('Đề thi không tồn tại!');
            }

            const added = await db.ExamQuestions.create(
                { examId, questionId: newQuestion.id },
                { transaction }
            );

            if (!added) {
                throw new Error('Lỗi khi thêm câu hỏi vào đề thi!');
            }
        }

        await transaction.commit();

        return {
            question: newQuestion,
            statements,
        };

    } catch (error) {
        await transaction.rollback();
        await cleanupUploadedFiles(uploadedFiles);
        throw error;
    }
};

export const updateQuestion = async (id, questionData, statements) => {
    const transaction = await db.sequelize.transaction();

    try {
        // Check if question exists
        const existingQuestion = await db.Question.findByPk(id, { transaction });

        if (!existingQuestion) {
            throw new Error('Câu hỏi không tồn tại!');
        }

        // Filter allowed fields
        const allowedFields = [
            'content',
            'difficulty',
            'chapter',
            'class',
            'description',
            'correctAnswer',
            'solution',
            'solutionUrl',
        ];

        const updateData = {};
        allowedFields.forEach((field) => {
            if (questionData[field] !== undefined) {
                updateData[field] = questionData[field];
            }
        });

        // Update question
        const [updated] = await db.Question.update(updateData, {
            where: { id },
            transaction,
        });

        if (!updated) {
            throw new Error('Lỗi khi cập nhật câu hỏi!');
        }

        // Update statements
        if (Array.isArray(statements) && statements.length > 0) {
            await Promise.all(
                statements.map(async (statement) => {
                    const { id: statementId, content, isCorrect, difficulty } = statement;

                    if (!statementId) return;

                    const statementUpdateData = {};
                    if (content !== undefined) statementUpdateData.content = content;
                    if (isCorrect !== undefined) statementUpdateData.isCorrect = isCorrect;
                    if (difficulty !== undefined) statementUpdateData.difficulty = difficulty;

                    await db.Statement.update(statementUpdateData, {
                        where: { id: statementId, questionId: id },
                        transaction,
                    });
                })
            );
        }

        await transaction.commit();

        // Return updated question
        const updatedQuestion = await db.Question.findByPk(id, {
            include: [{ model: db.Statement, as: 'statements' }],
        });

        return updatedQuestion;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const deleteQuestion = async (id) => {
    const deleted = await db.Question.destroy({
        where: { id }
    });

    if (!deleted) {
        throw new Error('Câu hỏi không tồn tại');
    }

    return true;
};

// Image Services
export const updateQuestionImage = async (id, imageFile) => {
    const transaction = await db.sequelize.transaction();

    try {
        const question = await db.Question.findByPk(id, { transaction });

        if (!question) {
            throw new Error('Câu hỏi không tồn tại.');
        }

        const oldImageUrl = question.imageUrl;
        let newImageUrl = null;

        if (imageFile) {
            newImageUrl = await uploadImage(imageFile);
        }

        const [updated] = await db.Question.update(
            { imageUrl: newImageUrl },
            { where: { id }, transaction }
        );

        if (!updated) {
            await cleanupUploadedFiles([newImageUrl]);
            throw new Error('Lỗi khi cập nhật ảnh câu hỏi.');
        }

        if (oldImageUrl) {
            try {
                await cleanupUploadedFiles([oldImageUrl]);
                console.log(`Đã xóa ảnh cũ: ${oldImageUrl}`);
            } catch (err) {
                console.error(`Lỗi khi xóa ảnh cũ: ${oldImageUrl}`, err);
                await cleanupUploadedFiles([newImageUrl]);
                throw new Error('Lỗi khi xóa ảnh cũ.');
            }
        }

        await transaction.commit();

        return {
            oldImageUrl,
            newImageUrl,
        };

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const updateQuestionSolutionImage = async (id, imageFile) => {
    const transaction = await db.sequelize.transaction();

    try {
        const question = await db.Question.findByPk(id, { transaction });

        if (!question) {
            throw new Error('Câu hỏi không tồn tại.');
        }

        const oldImageUrl = question.solutionImageUrl;
        let newImageUrl = null;

        if (imageFile) {
            newImageUrl = await uploadImage(imageFile);
        }

        const [updated] = await db.Question.update(
            { solutionImageUrl: newImageUrl },
            { where: { id }, transaction }
        );

        if (!updated) {
            await cleanupUploadedFiles([newImageUrl]);
            throw new Error('Lỗi khi cập nhật ảnh câu hỏi.');
        }

        if (oldImageUrl) {
            try {
                await cleanupUploadedFiles([oldImageUrl]);
                console.log(`Đã xóa ảnh cũ: ${oldImageUrl}`);
            } catch (err) {
                console.error(`Lỗi khi xóa ảnh cũ: ${oldImageUrl}`, err);
                await cleanupUploadedFiles([newImageUrl]);
                throw new Error('Lỗi khi xóa ảnh cũ.');
            }
        }

        await transaction.commit();

        return {
            oldImageUrl,
            newImageUrl,
        };

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const deleteQuestionImage = async (id) => {
    const transaction = await db.sequelize.transaction();

    try {
        const question = await db.Question.findByPk(id, { transaction });

        if (!question) {
            throw new Error('Câu hỏi không tồn tại.');
        }

        const oldImageUrl = question.imageUrl;

        const [updated] = await db.Question.update(
            { imageUrl: null },
            { where: { id }, transaction }
        );

        if (!updated) {
            throw new Error('Lỗi khi xóa ảnh câu hỏi.');
        }

        if (oldImageUrl) {
            try {
                await cleanupUploadedFiles([oldImageUrl]);
                console.log(`Đã xóa ảnh cũ: ${oldImageUrl}`);
            } catch (err) {
                console.error(`Lỗi khi xóa ảnh cũ: ${oldImageUrl}`, err);
                throw new Error('Lỗi khi xóa ảnh cũ.');
            }
        }

        await transaction.commit();

        return {
            oldImageUrl
        };

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
