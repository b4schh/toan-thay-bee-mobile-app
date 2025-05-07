import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import QuestionManagement from "./pages/admin/question/questionManagement";
import ClassManagement from "./pages/admin/class/ClassManagement";
import ExamManagement from "./pages/admin/exam/ExamManagement";
import StudentManagement from "./pages/admin/user/StudentManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import NotificationDisplay from "./components/error/NotificationDisplay"; // Đảm bảo file này export SuccessDisplay
import QuestionDetailAdmin from "./pages/admin/question/QuestionDetailAdmin";
import ExamDetailAdmin from "./pages/admin/exam/ExamDetailAdmin";
import QuestionOfExamAdmin from "./pages/admin/exam/QuestionOfExamAdmin";
import CodeManagement from "./pages/admin/CodeManagement";
import PreviewExamAdmin from "./pages/admin/exam/PreviewExamAdmin";
import StudentDetailAdmin from "./pages/admin/user/StudentDetailAdmin";
import ClassDetailAdmin from "./pages/admin/class/ClassDetailAdmin";
import ClassUserManagement from "./pages/admin/class/ClassUserManagement";
import LessonManagement from "./pages/admin/class/LessonManagement";
import TrackingPage from "./pages/admin/exam/TrackingExamAdmin";
import ArticlePostPage from "./pages/admin/ArticlePostPage";
import ArticleManagement from "./pages/admin/ArticleManagement";
import HomePageManagement from "./pages/admin/HomePageManagement";
import AchievementManagement from "./pages/admin/achievement/AchievementManagement";
import SpinnerDemo from "./components/loading/SpinnerDemo";
import QuestionReportManagement from "./pages/admin/QuestionReportManagement";

// import TestPage from "./pages/TestPage";

function App() {
    return (
        <BrowserRouter>
            {/* Hiển thị lỗi toàn cục */}
            <NotificationDisplay />

            <Routes>
                {/* Trang công khai */}
                <Route path="/login" element={<LoginPage />} />

                {/* <Route path="/admin/test" element={<TestPage />} /> */}

                {/* Trang Admin chỉ dành cho người có quyền */}
                <Route element={<ProtectedRoute allowedRoles={["AD", "AS", "GV"]} />}>
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/admin/question-management" element={<QuestionManagement />} />
                    <Route path="/admin/question-management/:questionId" element={<QuestionDetailAdmin />} />

                    <Route path="/admin/class-management" element={<ClassManagement />} />
                    <Route path="/admin/class-management/:classId" element={<ClassDetailAdmin />} />
                    <Route path="/admin/class-management/:classId/users" element={<ClassUserManagement />} />
                    <Route path="/admin/class-management/:classId/lessons" element={<LessonManagement />} />

                    <Route path="/admin/exam-management" element={<ExamManagement />} />
                    <Route path="/admin/exam-management/:examId" element={<ExamDetailAdmin />} />
                    <Route path="/admin/exam-management/:examId/questions" element={<QuestionOfExamAdmin />} />
                    <Route path="/admin/exam-management/:examId/preview" element={<PreviewExamAdmin />} />
                    <Route path="/admin/exam-management/:examId/tracking" element={<TrackingPage />} />
                    {/* Chỉ dành cho Admin */}
                    <Route path="/admin/student-management" element={<StudentManagement />} />
                    <Route path="/admin/student-management/:studentId" element={<StudentDetailAdmin />} />
                    <Route path="/admin/homepage-management" element={<HomePageManagement />} />
                    <Route path="/admin/achievement-management" element={<AchievementManagement />} />
                    <Route path="/admin/question-report-management" element={<QuestionReportManagement />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["AD"]} />}>
                    <Route path="/admin/code-management" element={<CodeManagement />} />
                    <Route path="/admin/article-management" element={<ArticleManagement />} />
                    <Route path="/admin/article-post" element={<ArticlePostPage />} />
                    <Route path="/admin/article-management/edit/:id" element={<ArticlePostPage />} />
                    <Route path="/admin/spinner-demo" element={<SpinnerDemo />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
