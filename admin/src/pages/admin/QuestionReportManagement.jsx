import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionReports, deleteQuestionReport } from '../../features/questionReport/questionReportSlice';
import { setCurrentPage, resetFilters } from '../../features/filter/filterSlice';
import { Eye, Trash2, AlertTriangle } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const QuestionReportManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const questionReports = useSelector((state) => state.questionReports.questionReports);
    const currentPage = useSelector((state) => state.filter.currentPage);
    const totalPages = useSelector((state) => state.filter.totalPages);
    const loading = useSelector((state) => state.loading);

    const [selectedReport, setSelectedReport] = useState(null);
    const [reportToDelete, setReportToDelete] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const ITEMS_PER_PAGE = 10;

    // Khởi tạo và reset filter khi component mount
    const [didInit, setDidInit] = useState(false);

    useEffect(() => {
        if (!didInit) {
            dispatch(resetFilters());
            setDidInit(true);
        }
    }, [dispatch, didInit]);

    useEffect(() => {
        if (didInit) {
            loadReports();
        }
    }, [currentPage, didInit]);

    const loadReports = () => {
        dispatch(fetchQuestionReports({
            currentPage,
            limit: ITEMS_PER_PAGE,
            sortOrder: 'desc'
        }));
    };

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    const handleViewReport = (report) => {
        setSelectedReport(report);
        setIsViewOpen(true);
    };

    const handleDeleteClick = (report) => {
        setReportToDelete(report);
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await dispatch(deleteQuestionReport(reportToDelete.id)).unwrap();
            alert('Báo cáo đã được xóa thành công');
            setIsDeleteOpen(false);
            loadReports();
        } catch (error) {
            alert('Không thể xóa báo cáo: ' + (error.message || 'Đã xảy ra lỗi'));
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN');
        } catch (error) {
            return 'Invalid date';
        }
    };



    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                    <LoadingSpinner size="lg" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Quản lý báo cáo câu hỏi</h1>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người báo cáo</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Câu hỏi</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nội dung báo cáo</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {questionReports.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                                            Không có báo cáo nào.
                                        </td>
                                    </tr>
                                ) : (
                                    questionReports.map((report) => (
                                        <tr key={report.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(report.user?.lastName + ' ' + report.user?.firstName) || 'Ẩn danh'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <span className="truncate max-w-[150px]">
                                                        {report.question?.content?.substring(0, 30) || 'N/A'}
                                                        {report.question?.content?.length > 30 ? '...' : ''}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="truncate max-w-[200px]">
                                                    {report.content}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(report.createdAt)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="p-1 rounded-full hover:bg-gray-100"
                                                        title="Xem chi tiết"
                                                        onClick={() => handleViewReport(report)}
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button
                                                        className="p-1 rounded-full hover:bg-gray-100 text-red-500"
                                                        title="Xóa báo cáo"
                                                        onClick={() => handleDeleteClick(report)}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center py-4">
                        <div className="flex items-center gap-2">
                            <button
                                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Trước
                            </button>
                            <span className="text-sm">
                                Trang {currentPage} / {totalPages || 1}
                            </span>
                            <button
                                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                                disabled={currentPage === totalPages || totalPages === 0}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modal xem chi tiết báo cáo */}
                {isViewOpen && selectedReport && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>

                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                                Chi tiết báo cáo
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500">ID báo cáo</h3>
                                                    <p>{selectedReport.id}</p>
                                                </div>

                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500">Người báo cáo</h3>
                                                    <p>{selectedReport.user?.lastName + ' ' + selectedReport.user?.firstName || 'Ẩn danh'}</p>
                                                </div>

                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500">Nội dung báo cáo</h3>
                                                    <p className="whitespace-pre-wrap">{selectedReport.content}</p>
                                                </div>

                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500">Thời gian báo cáo</h3>
                                                    <p>{formatDate(selectedReport.createdAt)}</p>
                                                </div>

                                                <div className="border-t pt-4">
                                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Thông tin câu hỏi</h3>
                                                    {selectedReport.question ? (
                                                        <div className="bg-gray-50 p-4 rounded-md">
                                                            <p className="font-medium mb-2">ID: {selectedReport.question.id}</p>
                                                            <div className="mb-2">
                                                                <h4 className="text-sm font-medium text-gray-500">Nội dung câu hỏi:</h4>
                                                                <p className="whitespace-pre-wrap">{selectedReport.question.content}</p>
                                                            </div>
                                                            {selectedReport.question.imageUrl && (
                                                                <div className="mb-2">
                                                                    <h4 className="text-sm font-medium text-gray-500">Hình ảnh:</h4>
                                                                    <img
                                                                        src={selectedReport.question.imageUrl}
                                                                        alt="Question image"
                                                                        className="max-h-40 object-contain mt-1"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center text-amber-600">
                                                            <AlertTriangle size={16} className="mr-2" />
                                                            <span>Không tìm thấy thông tin câu hỏi</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-end  gap-2'>
                                    <div className="py-2 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => navigate(`/admin/question-management/${selectedReport.question.id}`)}
                                        >
                                            Sửa
                                        </button>
                                    </div>
                                    <div className="py-2 sm:flex sm:flex-row-reverse pr-2">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setIsViewOpen(false)}
                                        >
                                            Đóng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal xác nhận xóa */}
                {isDeleteOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>

                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <AlertTriangle className="h-6 w-6 text-red-600" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                Xác nhận xóa
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Bạn có chắc chắn muốn xóa báo cáo này không? Hành động này không thể hoàn tác.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={confirmDelete}
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setIsDeleteOpen(false)}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default QuestionReportManagement;
