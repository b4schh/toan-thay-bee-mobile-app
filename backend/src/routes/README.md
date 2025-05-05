# Tài liệu API - Hệ thống Quản lý Học tập

## Tổng quan
Hệ thống API được tổ chức theo mô hình RESTful, với các endpoint được phân chia theo chức năng và đối tượng. API sử dụng Express.js làm framework chính và tuân theo cấu trúc route-controller.

## Cấu trúc URL
- Base URL: /api
- Phiên bản: /v1
- Phân quyền: /admin hoặc /user
- Đối tượng: /[tên đối tượng]

## Xác thực và Phân quyền
API sử dụng JWT (JSON Web Token) để xác thực người dùng. Các middleware phân quyền:
- requireRoles([]): Yêu cầu người dùng đã đăng nhập
- requireRoles([UserType.ADMIN]): Chỉ Admin mới có quyền truy cập
- requireRoles([UserType.ADMIN, UserType.TEACHER]): Admin hoặc Giáo viên có quyền truy cập
- requireRoles([UserType.ADMIN, UserType.TEACHER, UserType.ASSISTANT]): Admin, Giáo viên hoặc Trợ giảng có quyền truy cập
