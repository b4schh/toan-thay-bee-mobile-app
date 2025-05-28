// services/user.service.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import db from '../models/index.js';
import UserType from '../constants/UserType.js';
import UserStatus from '../constants/UserStatus.js';
import UserResponse from '../dtos/responses/user/UserResponse.js';
import { uploadImage, cleanupUploadedFiles } from '../utils/imageUpload.js';
import dotenv from 'dotenv';

dotenv.config();

// User Registration Services
export const checkUserExists = async (username, email, phone) => {
    const checks = [];

    if (username) {
        const existingUser = await db.User.findOne({ where: { username } });
        if (existingUser) {
            checks.push({ field: 'username', message: 'Username đã tồn tại' });
        }
    }

    if (email) {
        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            checks.push({ field: 'email', message: 'Email đã tồn tại' });
        }
    }

    if (phone) {
        const existingUser = await db.User.findOne({ where: { phone } });
        if (existingUser) {
            checks.push({ field: 'phone', message: 'Số điện thoại đã tồn tại' });
        }
    }

    return checks;
};

export const createUser = async (userData) => {
    const { username, email, phone, password, ...otherData } = userData;

    // Validate required fields
    if (!username && !email) {
        throw new Error('Tài khoản không được để trống');
    }

    // Check for existing users
    const existingChecks = await checkUserExists(username, email, phone);
    if (existingChecks.length > 0) {
        throw new Error(existingChecks[0].message);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await db.User.create({
        ...otherData,
        username,
        email,
        phone,
        password: hashedPassword,
        status: UserStatus.ACTIVE
    });

    if (!newUser) {
        throw new Error('Tạo mới người dùng thất bại');
    }

    return new UserResponse(newUser);
};

export const createUserBulk = async (users) => {
    const results = {
        success: [],
        failed: [],
    };
    let index = 0;

    for (const user of users) {
        const { username, phone, password } = user;

        try {
            // Check bắt buộc
            if (!username) {
                throw new Error('Thiếu username');
            }

            // Kiểm tra trùng lặp
            if (username) {
                const existUsername = await db.User.findOne({ where: { username } });
                if (existUsername) throw new Error('Username đã tồn tại');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo người dùng
            const newUser = await db.User.create({
                ...user,
                username,
                password: hashedPassword,
                userType: UserType.STUDENT,
                status: UserStatus.ACTIVE,
            });

            console.log(++index, newUser.toJSON());

            results.success.push(new UserResponse(newUser));
        } catch (err) {
            results.failed.push({
                user: username || email || phone || 'unknown',
                error: err.message,
            });
        }
    }

    return results;
};

// Authentication Services
export const authenticateUser = async (username, email, password) => {
    // Validate input
    if ((!username && !email) || !password) {
        throw new Error('Vui lòng nhập tài khoản và mật khẩu');
    }

    // Find user
    const user = await db.User.findOne({
        where: username ? { username } : { email },
    });

    if (!user) {
        throw new Error('Tài khoản hoặc mật khẩu không đúng');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Tài khoản hoặc mật khẩu không đúng');
    }

    return user;
};

export const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
    );
};

export const updateUserToken = async (userId, token) => {
    await db.User.update({ currentToken: token }, { where: { id: userId } });
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

export const validateUserSession = async (token) => {
    if (!token) {
        throw new Error('Chưa đăng nhập');
    }

    // Verify token
    const decoded = verifyToken(token);

    // Find user
    const user = await db.User.findOne({
        where: { id: decoded.id },
        attributes: ['id', 'lastName', 'firstName', 'phone', 'userType', 'currentToken', 'highSchool', 'class', 'gender', 'birthDate', 'avatarUrl'],
    });

    if (!user) {
        throw new Error('Người dùng không tồn tại');
    }

    if (user.currentToken !== token) {
        throw new Error('Phiên đăng nhập không hợp lệ');
    }

    return {
        id: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        userType: user.userType,
        highSchool: user.highSchool,
        class: user.class,
        phone: user.phone,
        gender: user.gender,
        birthDate: user.birthDate,
        avatarUrl: user.avatarUrl,
    };
};

export const logoutUser = async (userId) => {
    await db.User.update(
        { currentToken: null },
        { where: { id: userId } }
    );
};

// User Management Services
export const getUserById = async (id) => {
    const user = await db.User.findByPk(id);

    if (!user) {
        throw new Error('Người dùng không tồn tại');
    }

    return new UserResponse(user);
};

export const updateUser = async (userId, updateData, forbiddenFields = ['username', 'password', 'userType', 'status', 'avatarUrl']) => {
    // Filter out forbidden fields
    const filteredData = Object.keys(updateData)
        .filter(key => !forbiddenFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = updateData[key];
            return obj;
        }, {});

    if (Object.keys(filteredData).length === 0) {
        throw new Error('Không có trường hợp lệ để cập nhật.');
    }

    const [updated] = await db.User.update(filteredData, { where: { id: userId } });

    if (!updated) {
        throw new Error('Người dùng không tồn tại');
    }

    const updatedUser = await db.User.findByPk(userId);
    return new UserResponse(updatedUser);
};

export const changeUserType = async (userId, userType) => {
    const [updated] = await db.User.update(
        { userType, currentToken: null },
        { where: { id: userId } }
    );

    if (!updated) {
        throw new Error('Người dùng không tồn tại');
    }

    const updatedUser = await db.User.findByPk(userId);
    return new UserResponse(updatedUser);
};

export const changeUserStatus = async (userId, status) => {
    const [updated] = await db.User.update(
        { status, currentToken: null },
        { where: { id: userId } }
    );

    if (!updated) {
        throw new Error('Người dùng không tồn tại');
    }

    const updatedUser = await db.User.findByPk(userId);
    return new UserResponse(updatedUser);
};

export const changePassword = async (userId, oldPassword, newPassword, confirmPassword) => {
    // Validate input
    if (!oldPassword || !newPassword || !confirmPassword) {
        throw new Error('Vui lòng điền đầy đủ các trường.');
    }

    if (newPassword !== confirmPassword) {
        throw new Error('Mật khẩu xác nhận không khớp.');
    }

    // Get user
    const user = await db.User.findByPk(userId);
    if (!user) {
        throw new Error('Người dùng không tồn tại');
    }

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error('Mật khẩu cũ không đúng.');
    }

    // Check if new password is same as old
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
        throw new Error('Mật khẩu mới không được trùng với mật khẩu cũ.');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.User.update(
        {
            password: hashedPassword,
            currentToken: null
        },
        { where: { id: userId } }
    );
};

// Query Services
export const getAllUsers = async (search = '', page = 1, limit = 10, sortOrder = 'DESC') => {
    const offset = (page - 1) * limit;

    let whereClause = { userType: UserType.STUDENT };

    if (search.trim() !== '') {
        whereClause = {
            ...whereClause,
            [Op.or]: [
                { lastName: { [Op.like]: `%${search}%` } },
                { firstName: { [Op.like]: `%${search}%` } },
                { userType: { [Op.like]: `%${search}%` } },
                { highSchool: { [Op.like]: `%${search}%` } },
                { phone: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                { class: { [Op.like]: `%${search}%` } },
                { status: { [Op.like]: `%${search}%` } },
                { graduationYear: { [Op.like]: `%${search}%` } },
                { university: { [Op.like]: `%${search}%` } }
            ],
            userType: UserType.STUDENT,
        };
    }

    const [userList, total] = await Promise.all([
        db.User.findAll({
            where: whereClause,
            offset,
            limit,
            order: [['createdAt', sortOrder]],
        }),
        db.User.count({
            where: whereClause
        })
    ]);

    const formattedUsers = userList.map(user => new UserResponse(user));

    return {
        data: formattedUsers,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
    };
};

export const getUsersByClass = async (classId, search = '', page = 1, limit = 10, sortOrder = 'ASC') => {
    const offset = (page - 1) * limit;

    if (!classId) {
        throw new Error('Thiếu classId!');
    }

    const whereClause = search.trim() ? {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
        ],
    } : {};

    const users = await db.StudentClassStatus.findAll({
        where: { classId },
        include: [
            {
                model: db.User,
                as: 'student',
                where: whereClause,
            },
        ],
        limit,
        offset,
        order: [['status', sortOrder]],
    });

    const formattedUsers = users.map(userRecord => {
        const user = userRecord.student;
        const status = userRecord.status;
        return new UserResponse(user, status);
    });

    const total = formattedUsers.length;

    return {
        data: formattedUsers,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
    };
};

// Avatar Services
export const updateUserAvatar = async (userId, avatarFile) => {
    const transaction = await db.sequelize.transaction();

    try {
        const user = await db.User.findByPk(userId, { transaction });

        if (!user) {
            await transaction.rollback();
            throw new Error('Người dùng không tồn tại');
        }

        const oldAvatarUrl = user.avatarUrl;

        if (!avatarFile) {
            await transaction.rollback();
            throw new Error('Vui lòng chọn ảnh để tải lên.');
        }

        const newAvatarUrl = await uploadImage(avatarFile);

        if (!newAvatarUrl) {
            await transaction.rollback();
            throw new Error('Lỗi khi tải ảnh mới lên.');
        }

        const [updated] = await db.User.update(
            { avatarUrl: newAvatarUrl },
            { where: { id: userId }, transaction }
        );

        if (!updated) {
            await cleanupUploadedFiles([newAvatarUrl]);
            await transaction.rollback();
            throw new Error('Lỗi khi cập nhật avatar.');
        }

        if (oldAvatarUrl) {
            try {
                await cleanupUploadedFiles([oldAvatarUrl]);
                console.log(`Đã xóa ảnh cũ: ${oldAvatarUrl}`);
            } catch (err) {
                console.error(`Lỗi khi xóa ảnh cũ: ${oldAvatarUrl}`, err);
                await cleanupUploadedFiles([newAvatarUrl]);
                await transaction.rollback();
                throw new Error('Lỗi khi xóa ảnh cũ.');
            }
        }

        await transaction.commit();

        return {
            oldAvatarUrl,
            newAvatarUrl,
        };

    } catch (error) {
        console.error('Lỗi khi cập nhật avatar:', error);
        await transaction.rollback();
        throw error;
    }
};
