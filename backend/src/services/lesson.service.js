// services/lesson.service.js
import db from '../models/index.js';

// Query Services
export const getLessonById = async (id) => {
    const lesson = await db.Lesson.findOne({ where: { id } });
    
    if (!lesson) {
        throw new Error(`Không tìm thấy buổi học với ID: ${id}!`);
    }
    
    return lesson;
};

export const getLessonsByClassId = async (classId) => {
    const lessons = await db.Lesson.findAll({
        where: { classId },
        include: [
            {
                model: db.Class,
                as: 'class',
                attributes: ['id', 'name', 'description'],
            },
        ],
        order: [['createdAt', 'ASC']],
    });

    return lessons;
};

// Lesson Management Services
export const createLesson = async (lessonData) => {
    const transaction = await db.sequelize.transaction();

    try {
        // Tạo buổi học mới
        const newLesson = await db.Lesson.create(lessonData, { transaction });

        // Cập nhật lessonCount của lớp học
        const classUpdated = await db.Class.increment(
            { lessonCount: 1 },
            {
                where: { id: lessonData.classId },
                transaction
            }
        );

        if (!classUpdated[0]) {
            throw new Error("Không tìm thấy lớp để cập nhật lessonCount.");
        }

        await transaction.commit();

        return newLesson;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const updateLesson = async (id, updateData) => {
    const lesson = await db.Lesson.findOne({ where: { id } });
    
    if (!lesson) {
        throw new Error(`Không tìm thấy buổi học với ID: ${id}!`);
    }
    
    await lesson.update(updateData);
    
    return lesson;
};

export const deleteLesson = async (lessonId) => {
    const transaction = await db.sequelize.transaction();

    try {
        // Tìm buổi học cần xóa
        const lessonToDelete = await db.Lesson.findOne({
            where: { id: lessonId },
            transaction,
        });

        if (!lessonToDelete) {
            throw new Error("Không tìm thấy buổi học để xóa.");
        }

        // Xóa buổi học
        await lessonToDelete.destroy({ transaction });

        // Giảm lessonCount của lớp học
        const classUpdated = await db.Class.decrement(
            { lessonCount: 1 },
            {
                where: { id: lessonToDelete.classId },
                transaction,
            }
        );

        if (!classUpdated[0]) {
            throw new Error("Không tìm thấy lớp để cập nhật lessonCount.");
        }

        // Commit transaction
        await transaction.commit();

        return true;

    } catch (error) {
        // Rollback transaction nếu có lỗi
        await transaction.rollback();
        throw error;
    }
};
