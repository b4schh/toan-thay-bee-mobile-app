import { parseExcel, sanitizeExcelUser } from "../utils/excelParser.js";
import * as userService from "../services/user.service.js";
import dotenv from "dotenv";
import UserResponse from '../dtos/responses/user/UserResponse.js';
import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import UserType from '../constants/UserType.js';
import { Op } from 'sequelize'; 
import { uploadImage, cleanupUploadedFiles } from '../utils/imageUpload.js';

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json({
      message: "Thêm người dùng thành công",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const bulkRegister = async (req, res) => {
  try {
    const rawUsers = parseExcel(req.file.path);
    const users = rawUsers.map(sanitizeExcelUser);
    const result = await userService.createUserBulk(users);

    res.status(200).json({ message: "Đăng ký hàng loạt thành công", result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi xử lý file Excel", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Authenticate user
    const user = await userService.authenticateUser(username, email, password);

    // Generate token
    const token = userService.generateToken(user.id);

    // Update user token    
    await userService.updateUserToken(user.id, token);

    // Set token vào HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Chỉ true khi deploy
      sameSite: "None", // None để cho phép cross-origin
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
    });

    return res.status(200).json({
      message: "Đăng nhập thành công",
      user: new UserResponse(user),
      token,
    });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export const checkLogin = async (req, res) => {
  try {
    const token = req.cookies.token;
    const user = await userService.validateUserSession(token);

    return res.status(200).json({
      message: "Người dùng đã đăng nhập",
      user,
    });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const user = req.user;
    const updatedUser = await userService.updateUser(user.id, req.body);

    return res.status(200).json({
      message: "Cập nhật người dùng thành công",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const putUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(id, req.body);

    return res.status(200).json({
      message: "Cập nhật người dùng thành công",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Không xác định được người dùng." });
  }

  // Cập nhật currentToken của người dùng trong DB thành null
  await db.User.update({ currentToken: null }, { where: { id: user.id } });

  // Xoá cookie chứa token khỏi trình duyệt
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // chỉ áp dụng HTTPS ở môi trường production
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Đăng xuất thành công." });
};

export const changeUserType = async (req, res) => {
  const { id } = req.params;
  const { userType } = req.body;
  const [updated] = await db.User.update(
    { userType, currentToken: null },
    { where: { id } }
  );
  if (!updated) {
    return res.status(404).json({ message: "Người dùng không tồn tại" });
  }

  const updatedUser = await db.User.findByPk(id);
  return res.status(200).json({
    message: "Cập nhật role người dùng thành công",
    data: new UserResponse(updatedUser),
  });
};

export const changeUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const [updated] = await db.User.update(
    { status, currentToken: null },
    { where: { id } }
  );
  if (!updated) {
    return res.status(404).json({ message: "Người dùng không tồn tại" });
  }
  const updatedUser = await db.User.findByPk(id);
  return res.status(200).json({
    message: "Cập nhật trạng thái người dùng thành công",
    data: new UserResponse(updatedUser),
  });
};

export const changePassword = async (req, res) => {
  const user = req.user;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "Vui lòng điền đầy đủ các trường." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Mật khẩu xác nhận không khớp." });
  }

  if (!isMatch) {
    return res.status(400).json({ message: "Mật khẩu cũ không đúng." });
  }

  if (isSamePassword) {
    return res
      .status(400)
      .json({ message: "Mật khẩu mới không được trùng với mật khẩu cũ." });
  }

  await db.User.update(
    {
      password: hashedPassword,
      currentToken: null,
    },
    { where: { id: user.id } }
  );

  return res
    .status(200)
    .json({ message: "Đổi mật khẩu thành công. Vui lòng đăng nhập lại." });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const userDetail = await db.User.findByPk(id);

  if (!userDetail) {
    return res.status(404).json({ message: "Người dùng không tồn tại" });
  }
  return res.status(200).json({
    message: "Chi tiết người dùng",
    user: new UserResponse(userDetail),
    // userDetail
  });
};

export const getAllUsers = async (req, res) => {
  const sortOrder = req.query.sortOrder || "DESC";
  const search = req.query.search || "";
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  let whereClause = { userType: UserType.STUDENT };

  if (search.trim() !== "") {
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
        { university: { [Op.like]: `%${search}%` } },
      ],
      userType: UserType.STUDENT,
    };
  }

  const [userList, total] = await Promise.all([
    db.User.findAll({
      where: whereClause,

      offset,
      limit,
      order: [["createdAt", sortOrder]],
    }),
    db.User.count({
      where: whereClause,
    }),
  ]);

  const formattedUsers = userList.map((user) => new UserResponse(user));

  return res.status(200).json({
    message: "Lấy danh sách người dùng thành công",
    data: formattedUsers,
    // data: userList,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  });
};

export const getUsersByClass = async (req, res) => {
  const classId = req.params.classId;
  const search = req.query.search || "";
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;
  const sortOrder = req.query.sortOrder || "ASC";

  if (!classId) {
    return res.status(400).json({ message: "Thiếu classId!" });
  }

  const whereClause = search.trim()
    ? {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      }
    : {};

  const users = await db.StudentClassStatus.findAll({
    where: { classId },
    include: [
      {
        model: db.User,
        as: "student",
        where: whereClause,
      },
    ],
    limit,
    offset,
    order: [["status", sortOrder]],
  });
  const formattedUsers = users.map((userRecord) => {
    const user = userRecord.student;
    const status = userRecord.status;
    return new UserResponse(user, status);
  });
  const total = formattedUsers.length;

  return res.status(200).json({
    message: "Lấy danh sách người dùng trong lớp thành công!",
    data: formattedUsers,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  });
};

export const updateAvatar = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  const { id } = req.user;

  try {
    const user = await db.User.findByPk(id, { transaction });

    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const oldAvatarUrl = user.avatarUrl;
    const newAvatarFile = req.file;

    if (!newAvatarFile) {
      await transaction.rollback();
      return res.status(400).json({ message: "Vui lòng chọn ảnh để tải lên." });
    }
    const newAvartarUrl = await uploadImage(newAvatarFile);

    if (!newAvartarUrl) {
      await transaction.rollback();
      return res.status(500).json({ message: "Lỗi khi tải ảnh mới lên." });
    }

    const [updated] = await db.User.update(
      { avatarUrl: newAvartarUrl },
      { where: { id }, transaction }
    );

    if (!updated) {
      await cleanupUploadedFiles([newAvartarUrl]);
      await transaction.rollback();
      return res.status(500).json({ message: "Lỗi khi cập nhật avatar." });
    }

    if (oldAvatarUrl) {
      try {
        await cleanupUploadedFiles([oldAvatarUrl]);
        console.log(`Đã xóa ảnh cũ: ${oldAvatarUrl}`);
      } catch (err) {
        console.error(`Lỗi khi xóa ảnh cũ: ${oldAvatarUrl}`, err);
        await cleanupUploadedFiles([newAvartarUrl]);
        await transaction.rollback();
        return res
          .status(500)
          .json({ message: "Lỗi khi xóa ảnh cũ.", error: err.message });
      }
    }

    await transaction.commit();

    return res.status(200).json({
      message: "Cập nhật avartar thành công.",
      oldAvatarUrl,
      newAvartarUrl,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật avartar:", error);
    await transaction.rollback();
    return res
      .status(500)
      .json({ message: "Lỗi server.", error: error.message });
  }
};
