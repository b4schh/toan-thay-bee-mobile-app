// services/exam.service.js
import { Op } from "sequelize";
import db from "../models/index.js";
import { uploadImage, cleanupUploadedFiles } from "../utils/imageUpload.js";
import {
  uploadPdfToFirebase,
  deletePdfFromFirebase,
} from "../utils/pdfUpload.js";

// Query Services
export const getAllExams = async (
  search = "",
  page = 1,
  limit = 10,
  sortOrder = "DESC"
) => {
  const offset = (page - 1) * limit;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { chapter: { [Op.like]: `%${search}%` } },
        { year: { [Op.like]: `%${search}%` } },
        { class: { [Op.like]: `%${search}%` } },
        { typeOfExam: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const [examList, total] = await Promise.all([
    db.Exam.findAll({
      where: whereClause,
      offset,
      limit,
      order: [["createdAt", sortOrder]],
    }),
    db.Exam.count({
      where: whereClause,
    }),
  ]);

  return {
    data: examList,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  };
};

export const getNewestExams = async (limit = 3) => {
  const exams = await db.Exam.findAll({
    where: { public: true },
    order: [["createdAt", "DESC"]],
    limit,
  });

  return exams;
};

export const getPublicExams = async (
  userId,
  search = "",
  currentPage = 1,
  limit = 10,
  sortOrder = "DESC",
  filters = {}
) => {
  const offset = (currentPage - 1) * limit;
  const { classFilter, typeOfExamFilters = [], chapterFilters = [] } = filters;

  // Build conditions array
  const conditions = [{ public: true }]; // Base condition

  // Add search conditions
  if (search.trim() !== "") {
    conditions.push({
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { chapter: { [Op.like]: `%${search}%` } },
        { year: { [Op.like]: `%${search}%` } },
        { class: { [Op.like]: `%${search}%` } },
        { typeOfExam: { [Op.like]: `%${search}%` } },
      ],
    });
  }

  // Add mandatory grade filter if provided
  if (classFilter) {
    conditions.push({ class: classFilter });
  }

  // Add type of exam filter if provided
  if (typeOfExamFilters.length > 0) {
    conditions.push({
      typeOfExam: { [Op.in]: typeOfExamFilters },
    });
  }

  // Add chapter filter if provided
  if (chapterFilters.length > 0) {
    conditions.push({
      chapter: { [Op.in]: chapterFilters },
    });
  }

  // Combine all conditions with AND
  const whereClause = {
    [Op.and]: conditions,
  };

  try {
    // Execute query
    const [examList, total] = await Promise.all([
      db.Exam.findAll({
        where: whereClause,
        offset,
        limit,
        order: [["createdAt", sortOrder]],
      }),
      db.Exam.count({ where: whereClause }),
    ]);

    // Lấy ID của tất cả các đề thi
    const examIds = examList.map((exam) => exam.id);

    // Đếm tổng số lượt làm cho mỗi đề thi
    const totalAttempts = await db.StudentExamAttempt.findAll({
      attributes: [
        'examId',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'totalCount']
      ],
      where: {
        examId: { [Op.in]: examIds }
      },
      group: ['examId']
    });
    
    // Tạo map để lưu số lượt làm của mỗi đề thi
    const totalAttemptsMap = {};
    totalAttempts.forEach(item => {
      totalAttemptsMap[item.examId] = parseInt(item.getDataValue('totalCount'));
    });

    // Get status for each exam if user is logged in
    const statuses = await db.StudentExamStatus.findAll({
      where: {
        studentId: userId,
        examId: { [Op.in]: examIds },
      },
    });

    const statusMap = {};
    statuses.forEach((status) => {
      statusMap[status.examId] = {
        isDone: status.isDone,
        isSave: status.isSave,
      };
    });

    // Lấy số lượt làm của người dùng hiện tại
    const userAttempts = await db.StudentExamAttempt.findAll({
      attributes: [
        'examId',
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'userCount']
      ],
      where: {
        examId: { [Op.in]: examIds },
        studentId: userId
      },
      group: ['examId']
    });
    
    const userAttemptsMap = {};
    userAttempts.forEach(item => {
      userAttemptsMap[item.examId] = parseInt(item.getDataValue('userCount'));
    });

    const examListWithStatus = examList.map((exam) => {
      const status = statusMap[exam.examId] || { isDone: false, isSave: false };
      return {
        ...exam.toJSON(),
        isDone: status.isDone,
        isSave: status.isSave,
        participantsCount: totalAttemptsMap[exam.id] || 0,
        userAttemptCount: userAttemptsMap[exam.id] || 0
      };
    });

    return {
      data: examListWithStatus,
      currentPage: currentPage,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      limit: limit
    };
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đề thi công khai:", error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy danh sách đề thi",
      error: error.message
    });
  }
};

export const getExamById = async (id) => {
  const examDetail = await db.Exam.findByPk(id);

  if (!examDetail) {
    throw new Error("Đề không tồn tại");
  }

  return examDetail;
};

export const getPublicExamById = async (id, userId = null) => {
  const examDetail = await db.Exam.findByPk(id);

  if (!examDetail) {
    throw new Error("Đề không công khai hoặc không tồn tại");
  }

  if (!examDetail.public) {
    throw new Error("Đề không công khai hoặc không tồn tại");
  }

  // Mặc định trạng thái
  let isDone = false;
  let isSave = false;

  // Nếu có user => check trạng thái
  if (userId) {
    const status = await db.StudentExamStatus.findOne({
      where: {
        studentId: userId,
        examId: id,
      },
    });

    if (status) {
      isDone = status.isDone;
      isSave = status.isSave;
    }
  }

  return {
    ...examDetail.toJSON(),
    isDone,
    isSave,
  };
};

export const getQuestionsByExamId = async (
  examId,
  search = "",
  page = 1,
  limit = 10,
  sortOrder = "desc"
) => {
  const offset = (page - 1) * limit;

  if (!examId) {
    throw new Error("examId không hợp lệ!");
  }

  const exam = await db.Exam.findByPk(examId, {
    include: [
      {
        model: db.Question,
        as: "questions",
        through: {
          attributes: ["order"],
        },
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

  if (!exam) {
    throw new Error("Không tìm thấy đề thi!");
  }

  // Lọc câu hỏi
  let filteredQuestions = exam.questions;

  if (search.trim() !== "") {
    filteredQuestions = filteredQuestions.filter((question) =>
      [
        question.content,
        question.typeOfQuestion,
        question.chapter,
        question.difficulty,
        question.class,
        question.id?.toString(),
        question.description,
      ]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(search.toLowerCase()))
    );
  }

  // Sắp xếp theo order trong bảng trung gian ExamQuestions
  filteredQuestions.sort((a, b) => {
    const orderA = a.ExamQuestions?.order || 0;
    const orderB = b.ExamQuestions?.order || 0;
    return sortOrder === "desc" ? orderA - orderB : orderB - orderA;
  });

  // Sắp xếp mệnh đề bên trong từng câu hỏi
  filteredQuestions.forEach((question) => {
    if (Array.isArray(question.statements)) {
      question.statements.sort((a, b) => a.order - b.order);
    }
  });

  const total = filteredQuestions.length;
  const paginatedQuestions = filteredQuestions.slice(offset, offset + limit);

  return {
    data: paginatedQuestions,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    exam,
  };
};

export const getPublicQuestionsByExamId = async (examId) => {
  if (!examId) {
    throw new Error("examId không hợp lệ!");
  }

  const exam = await db.Exam.findOne({
    where: { id: examId, public: true },
    attributes: [
      "name",
      "testDuration",
      "class",
      "solutionUrl",
      "isCheatingCheckEnabled",
      "attemptLimit",
    ],
    include: [
      {
        model: db.Question,
        as: "questions",
        through: { attributes: ["order"] },
        attributes: ["id", "content", "typeOfQuestion", "imageUrl"],
        include: [
          {
            model: db.Statement,
            as: "statements",
            attributes: ["id", "content", "imageUrl", "order"],
          },
        ],
      },
    ],
  });

  if (!exam) {
    throw new Error("Không tìm thấy đề thi công khai!");
  }

  // Sắp xếp câu hỏi theo order trong bảng ExamQuestions
  exam.questions.sort((a, b) => {
    const orderA = a.ExamQuestions?.order || 0;
    const orderB = b.ExamQuestions?.order || 0;
    return orderA - orderB;
  });

  // Sắp xếp các mệnh đề trong từng câu hỏi theo order
  exam.questions.forEach((question) => {
    if (Array.isArray(question.statements)) {
      question.statements.sort((a, b) => a.order - b.order);
    }
  });

  return {
    questions: exam.questions,
    exam: {
      name: exam.name,
      testDuration: exam.testDuration,
      class: exam.class,
      solutionUrl: exam.solutionUrl,
      isCheatingCheckEnabled: exam.isCheatingCheckEnabled,
      attemptLimit: exam.attemptLimit,
    },
  };
};

// Exam Management Services
export const createExam = async (examData, questions, files) => {
  const transaction = await db.sequelize.transaction();
  const uploadedFiles = [];

  try {
    const { examImage, questionImages = [], statementImages = [] } = files;

    if (!examData || !Array.isArray(questions) || !questions.length) {
      throw new Error("Dữ liệu đề hoặc câu hỏi không hợp lệ!");
    }

    const examImageUrl = await uploadImage(examImage);
    if (examImageUrl) uploadedFiles.push(examImageUrl);

    const newExam = await db.Exam.create(
      { ...examData, imageUrl: examImageUrl },
      { transaction }
    );

    let questionImageIndex = 0;
    let statementImageIndex = 0;
    let createdQuestions = [];

    for (let i1 = 0; i1 < questions.length; i1++) {
      const { questionData, statements } = questions[i1];
      let questionImageUrl = null;

      if (questionData.needImage && questionImages[questionImageIndex]) {
        const image = questionImages[questionImageIndex];
        questionImageIndex++;
        questionImageUrl = await uploadImage(image);
        if (questionImageUrl) uploadedFiles.push(questionImageUrl);
      }

      const newQuestion = await db.Question.create(
        { ...questionData, imageUrl: questionImageUrl },
        { transaction }
      );

      await db.ExamQuestions.create(
        {
          examId: newExam.id,
          questionId: newQuestion.id,
          order: i1 + 1,
        },
        { transaction }
      );

      let createdStatements = [];

      if (Array.isArray(statements) && statements.length) {
        for (let i2 = 0; i2 < statements.length; i2++) {
          const statement = statements[i2];
          let statementImageUrl = null;

          if (statement.needImage && statementImages[statementImageIndex]) {
            const image1 = statementImages[statementImageIndex];
            statementImageIndex++;
            statementImageUrl = await uploadImage(image1);
            if (statementImageUrl) uploadedFiles.push(statementImageUrl);
          }

          const newStatement = await db.Statement.create(
            {
              ...statement,
              imageUrl: statementImageUrl,
              questionId: newQuestion.id,
              order: i2 + 1,
            },
            { transaction }
          );

          createdStatements.push(newStatement);
        }
      }

      createdQuestions.push({
        question: newQuestion,
        statements: createdStatements,
      });
    }

    await transaction.commit();

    return {
      exam: newExam,
      questions: createdQuestions,
    };
  } catch (error) {
    await transaction.rollback();
    await cleanupUploadedFiles(uploadedFiles);
    throw error;
  }
};

export const updateExam = async (id, updateData) => {
  const [updated] = await db.Exam.update(updateData, {
    where: { id },
  });

  if (!updated) {
    throw new Error("Đề thi không tồn tại");
  }

  const updatedExam = await db.Exam.findByPk(id);
  return updatedExam;
};

export const updateExamImage = async (id, imageFile) => {
  const transaction = await db.sequelize.transaction();

  try {
    const exam = await db.Exam.findByPk(id);
    if (!exam) {
      throw new Error("Đề thi không tồn tại");
    }

    const oldImageUrl = exam.imageUrl;
    let newImageUrl = null;
    if (imageFile) {
      newImageUrl = await uploadImage(imageFile);
    }

    const [updated] = await db.Exam.update(
      { imageUrl: newImageUrl },
      { where: { id } }
    );

    if (!updated) {
      await cleanupUploadedFiles([newImageUrl]);
      throw new Error("Lỗi khi cập nhật ảnh đề thi");
    }

    if (oldImageUrl) {
      try {
        await cleanupUploadedFiles([oldImageUrl]);
      } catch (error) {
        await cleanupUploadedFiles([newImageUrl]);
        throw new Error("Lỗi khi xóa ảnh cũ");
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

export const deleteExam = async (id) => {
  const deleted = await db.Exam.destroy({
    where: { id },
  });

  if (!deleted) {
    throw new Error("Đề thi không tồn tại");
  }

  return true;
};

// User Exam Services
export const saveExamForUser = async (userId, examId) => {
  if (!examId) {
    throw new Error("examId là bắt buộc.");
  }

  // Kiểm tra exam tồn tại
  const exam = await db.Exam.findByPk(examId);
  if (!exam) {
    throw new Error("Không tìm thấy đề thi.");
  }

  // Tìm hoặc tạo trạng thái lưu đề cho user
  const [status, created] = await db.StudentExamStatus.findOrCreate({
    where: { studentId: userId, examId },
    defaults: {
      isSave: true,
      isDone: false,
      completionTime: null,
    },
  });

  // Nếu đã tồn tại thì cập nhật isSave = true
  if (!created) {
    status.isSave = !status.isSave;
    await status.save();
  }

  return {
    examId,
    isSave: status.isSave,
  };
};

export const getSavedExams = async (userId) => {
  const savedExams = await db.StudentExamStatus.findAll({
    where: { studentId: userId, isSave: true },
    include: [
      {
        model: db.Exam,
        as: "exam",
        attributes: [
          "id",
          "name",
          "typeOfExam",
          "class",
          "chapter",
          "testDuration",
          "public",
          "createdAt",
          "updatedAt",
        ],
      },
    ],
  });

  return savedExams;
};

export const uploadSolutionPdf = async (id, req) => {
  const transaction = await db.sequelize.transaction();
  let uploadedFile;

  const exam = await db.Exam.findByPk(id);
  if (!exam) {
    throw new Error("Đề thi không tồn tại");
  }

  try {
    if (exam.solutionPdfUrl) {
      await deletePdfFromFirebase(exam.solutionPdfUrl);
    }

    if (req.file) {
      uploadedFile = await uploadPdfToFirebase(req);
      await exam.update({ solutionPdfUrl: uploadedFile.file }, { transaction });
    } else {
      await exam.update({ solutionPdfUrl: null }, { transaction });
    }

    await transaction.commit();

    return exam.solutionPdfUrl;
  } catch (error) {
    await transaction.rollback();
    if (uploadedFile) {
      await deletePdfFromFirebase(uploadedFile.file);
    }
    throw error;
  }
};

export const getRelatedExams = async (examId, userId = null, limit = 5) => {
  // Find the source exam
  const sourceExam = await db.Exam.findByPk(examId);

  if (!sourceExam) {
    throw new Error("Không tìm thấy đề thi gốc");
  }

  // Create query to find related exams
  const whereClause = {
    id: { [Op.ne]: examId }, // Không phải đề hiện tại
    public: true, // Chỉ lấy đề công khai
    [Op.or]: [
      { class: sourceExam.class },
      { typeOfExam: sourceExam.typeOfExam },
      ...(sourceExam.chapter ? [{ chapter: sourceExam.chapter }] : []),
    ],
  };

  // Add chapter condition if it exists
  if (sourceExam.chapter) {
    whereClause[Op.or].push({ chapter: sourceExam.chapter });
  }

  // Find related exams
  let relatedExams = await db.Exam.findAll({
    where: whereClause,
    limit: limit,
    order: [["createdAt", "DESC"]],
  });

  const relatedIds = relatedExams.map((e) => e.id);

  // Nếu chưa đủ -> lấy thêm đề mới nhất để bù
  if (relatedExams.length < limit) {
    const remaining = limit - relatedExams.length;

    const additionalExams = await db.Exam.findAll({
      where: {
        id: { [Op.notIn]: [examId, ...relatedIds] },
        public: true,
      },
      order: [["createdAt", "DESC"]],
      limit: remaining,
    });

    relatedExams = [...relatedExams, ...additionalExams];
  }

  // If user is logged in, get their status for these exams
  let examStatusMap = {};

  if (userId && relatedExams.length > 0) {
    const examIds = relatedExams.map((exam) => exam.id);

    const statuses = await db.StudentExamStatus.findAll({
      where: {
        studentId: userId,
        examId: { [Op.in]: examIds },
      },
    });

    statuses.forEach((status) => {
      examStatusMap[status.examId] = {
        isDone: status.isDone,
        isSave: status.isSave,
      };
    });
  }

  // Add status to each exam if user is logged in
  const formattedExams = relatedExams.map((exam) => {
    const examData = exam.toJSON();
    if (userId) {
      const status = examStatusMap[exam.id] || { isDone: false, isSave: false };
      return {
        ...examData,
        isDone: status.isDone,
        isSave: status.isSave,
      };
    }
    return examData;
  });

  return formattedExams;
};

// Exam Submission Service
export const submitExam = async (attemptId, userId = null) => {
  const t = await db.sequelize.transaction();

  try {
    const attempt = await db.StudentExamAttempt.findByPk(attemptId, {
      transaction: t,
    });

    if (!attempt) {
      throw new Error("Nộp bài thất bại, vui lòng thử lại.");
    }

    // Validate user ownership if userId is provided
    if (userId && attempt.studentId !== userId) {
      throw new Error("Bạn không có quyền nộp bài thi này.");
    }

    if (attempt.endTime) {
      throw new Error("Bài thi đã được nộp trước đó.");
    }

    attempt.endTime = new Date();

    const status = await db.StudentExamStatus.findOne({
      where: { studentId: attempt.studentId, examId: attempt.examId },
      transaction: t,
    });

    if (status) {
      status.isDone = true;
      await status.save({ transaction: t });
    } else {
      await db.StudentExamStatus.create(
        {
          studentId: attempt.studentId,
          examId: attempt.examId,
          isDone: true,
        },
        { transaction: t }
      );
    }

    // Lấy tất cả answer + typeOfQuestion từ Question
    const answers = await db.Answer.findAll({
      where: { attemptId },
      include: {
        model: db.Question,
        attributes: ["id", "typeOfQuestion"],
      },
      transaction: t,
    });

    // Tính điểm
    let totalScore = 0;

    for (const answer of answers) {
      const { typeOfQuestion } = answer.Question;
      const isCorrect = answer.result === true;

      if (typeOfQuestion === "TN" && isCorrect) {
        totalScore += 0.25;
      } else if (typeOfQuestion === "TLN" && isCorrect) {
        totalScore += 0.5;
      } else if (typeOfQuestion === "DS") {
        let count = 0;
        if (!answer.answerContent || answer.answerContent == []) continue;
        const answersDS = JSON.parse(answer.answerContent); // [{statementId, answer: true/false}]

        for (const answerDS of answersDS || []) {
          const statement = await db.Statement.findByPk(answerDS.statementId);
          if (statement && statement.isCorrect === answerDS.answer) {
            count++;
          }
        }

        // Tính điểm dựa vào số lượng đúng
        if (count === 1) totalScore += 0.1;
        else if (count === 2) totalScore += 0.25;
        else if (count === 3) totalScore += 0.5;
        else if (count >= 4) totalScore += 1.0;
      }
    }

    attempt.score = parseFloat(totalScore.toFixed(2));
    await attempt.save({ transaction: t });

    await t.commit();

    return {
      message: "Nộp bài thành công!",
      timestamp: new Date(),
      attemptId,
      score: attempt.score,
      answers: answers.map((a) => ({
        id: a.id,
        questionId: a.questionId,
        answerContent: a.answerContent,
        result: a.result,
        typeOfQuestion: a.Question?.typeOfQuestion || null,
      })),
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
