import db from "../models/index.js";
import UserType from "../constants/UserType.js";
import { uploadImage, cleanupUploadedFiles } from "../utils/imageUpload.js";
import { Op, or } from "sequelize";
import {
  uploadPdfToFirebase,
  deletePdfFromFirebase,
} from "../utils/pdfUpload.js";

export const getArticle = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || "";
    const sortOrder = req.query.sortOrder || "DESC";

    // Parse filters
    const gradeFilter = req.query.grade; // single value

    // Handle array parameters properly
    const articleTypeFilters =
      req.query.articleType instanceof Array
        ? req.query.articleType
        : typeof req.query.articleType === "string"
        ? [req.query.articleType]
        : [];

    const chapterFilters =
      req.query.chapter instanceof Array
        ? req.query.chapter
        : typeof req.query.chapter === "string"
        ? [req.query.chapter]
        : [];

    // Base where clause
    let whereClause = {};

    // Build conditions array
    const conditions = [];

    // Add search condition
    if (search.trim() !== "") {
      conditions.push({
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { content: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
        ],
      });
    }

    // Add mandatory grade filter if provided
    if (gradeFilter) {
      conditions.push({
        class: gradeFilter, // Using 'class' instead of 'grade'
      });
    }

    // Add article type filter (OR condition between types)
    if (articleTypeFilters.length > 0) {
      conditions.push({
        type: { [Op.in]: articleTypeFilters }, // Using 'type' instead of 'articleType'
      });
    }

    // Add chapter filter with NULL handling
    if (chapterFilters.length > 0) {
      conditions.push({
        chapter: { [Op.in]: chapterFilters },
      });
    }

    // Combine all conditions with AND
    if (conditions.length > 0) {
      whereClause = {
        [Op.and]: conditions,
      };
    }

    // Execute query with pagination
    const [articles, total] = await Promise.all([
      db.Article.findAll({
        where: whereClause,
        order: [["createdAt", sortOrder]],
        limit,
        offset,
        include: [
          {
            model: db.AllCode,
            as: "typeData",
            attributes: ["code", "description"],
          },
          {
            model: db.AllCode,
            as: "classData",
            attributes: ["code", "description"],
          },
          {
            model: db.AllCode,
            as: "chapterData",
            attributes: ["code", "description"],
          },
        ],
      }),
      db.Article.count({ where: whereClause }),
    ]);

    res.status(200).json({
      message: "Danh sách bài viết",
      data: articles,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        perPage: limit,
      },
    });
  } catch (error) {
    console.error("Error in getArticle:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const getNewestArticle = async (req, res) => {
  const article = await db.Article.findAll({
    order: [["createdAt", "DESC"]], // Sắp xếp theo ngày tạo mới nhất
    limit: 3,
  });
  res.status(200).json({
    message: "Danh sách bài viết mới nhất",
    data: article,
  });
};

export const getArticleById = async (req, res) => {
  const { id } = req.params;

  const article = await db.Article.findOne({
    where: {
      id: id,
    },
  });

  if (!article) {
    return res.status(404).json({
      message: "Không tìm thấy bài viết",
    });
  }

  res.status(200).json({
    message: "Chi tiết bài viết",
    data: article,
  });
};

export const putArticle = async (req, res) => {
  await db.Article.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    message: "Cập nhật bài viết thành công",
  });
};

export const postArticle = async (req, res) => {
  await db.Article.create(req.body);
  res.status(201).json({
    message: "Tạo bài viết thành công",
  });
};

export const deleteArticle = async (req, res) => {
  await db.Article.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    message: "Xóa bài viết thành công",
    data: req.params.id,
  });
};
