import * as lessonService from '../services/lesson.service.js';

export const getLessonById = async (req, res) => {
    try {
        const { id } = req.params;
        const lesson = await lessonService.getLessonById(id);

        return res.status(200).json({
            message: 'Lấy thông tin buổi học thành công!',
            data: lesson
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
}

export const getLessonByClassId = async (req, res) => {
    try {
        const { classId } = req.params;
        const lessons = await lessonService.getLessonsByClassId(classId);

        return res.status(200).json({
            message: 'Lấy danh sách buổi học thành công!',
            data: lessons,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const insertLesson = async (req, res) => {
    try {
        const lessonData = { ...req.body };
        const newLesson = await lessonService.createLesson(lessonData);

        return res.status(201).json({
            message: "Tạo buổi học mới thành công và cập nhật lessonCount!",
            data: newLesson,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};


export const changeLesson = async (req, res) => {
    try {
        const { id } = req.params;
        await lessonService.updateLesson(id, req.body);

        return res.status(200).json({
            message: 'Cập nhật thông tin buổi học thành công!',
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
}

export const deleteLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        await lessonService.deleteLesson(lessonId);

        return res.status(200).json({
            message: "Xóa buổi học thành công và cập nhật lessonCount!",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

