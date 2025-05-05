import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postQuestionReport } from "../../features/questionReport/questionReportSlice";
import { X, ChevronDown } from "lucide-react";

const MAX_CONTENT_LENGTH = 100;

// Danh sách các lý do báo cáo
const REPORT_REASONS = [
    { id: "typo", label: "Lỗi chính tả" },
    { id: "image", label: "Thiếu hình ảnh" },
    { id: "incorrect", label: "Nội dung không chính xác" },
    { id: "missing", label: "Thiếu dữ kiện" },
    { id: "unclear", label: "Câu hỏi không rõ ràng" },
    { id: "duplicate", label: "Câu hỏi trùng lặp" },
    { id: "other", label: "Khác (vui lòng mô tả)" }
];

const ReportQuestionModal = ({ isOpen, onClose, questionId }) => {
    const dispatch = useDispatch();
    const [selectedReason, setSelectedReason] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const { user } = useSelector(state => state.auth);

    // Reset form khi modal đóng/mở
    useEffect(() => {
        if (isOpen) {
            setSelectedReason("");
            setContent("");
            setError("");
            setShowDropdown(false);
        }
    }, [isOpen]);

    useEffect(() => {
        setCharCount(content.length);
    }, [content]);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown) {
                const dropdownElements = document.querySelectorAll('.report-dropdown-container');
                let clickedInside = false;

                dropdownElements.forEach(element => {
                    if (element.contains(event.target)) {
                        clickedInside = true;
                    }
                });

                if (!clickedInside) {
                    setShowDropdown(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        if (newContent.length <= MAX_CONTENT_LENGTH) {
            setContent(newContent);
        }
    };

    const handleReasonSelect = (reasonId) => {
        setSelectedReason(reasonId);
        setShowDropdown(false);

        // Nếu chọn lý do có sẵn (không phải "Khác"), tự động điền nội dung
        if (reasonId !== "other") {
            const selectedReasonLabel = REPORT_REASONS.find(reason => reason.id === reasonId)?.label;
            setContent(selectedReasonLabel || "");
        } else {
            setContent("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedReason) {
            setError("Vui lòng chọn lý do báo cáo");
            return;
        }

        if (selectedReason === "other" && !content.trim()) {
            setError("Vui lòng nhập nội dung báo cáo");
            return;
        }

        if (content.length > MAX_CONTENT_LENGTH) {
            setError(`Nội dung báo cáo không được vượt quá ${MAX_CONTENT_LENGTH} ký tự`);
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const reportData = {
                questionId,
                content: content.trim(),
                userId: user.id,
            };

            await dispatch(postQuestionReport(reportData)).unwrap();
            setSuccess(true);
            setSelectedReason("");
            setContent("");
            setCharCount(0);

            // Tự động đóng modal sau 2 giây
            setTimeout(() => {
                onClose();
                setSuccess(false);
            }, 2000);
        } catch (error) {
            setError(error.message || "Có lỗi xảy ra khi gửi báo cáo");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center  bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl min-h-[30rem] w-full max-w-md mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-blue-600">
                    <h3 className="text-lg font-medium text-white">Báo cáo câu hỏi</h3>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4">
                    {success ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            <p className="font-medium">Báo cáo đã được gửi thành công!</p>
                            <p className="text-sm">Cảm ơn bạn đã đóng góp để cải thiện chất lượng đề thi.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    {error}
                                </div>
                            )}

                            {/* Dropdown lý do báo cáo */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Lý do báo cáo <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="relative report-dropdown-container" style={{ zIndex: 30 }}>
                                        <button
                                            type="button"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={() => setShowDropdown(!showDropdown)}
                                            disabled={isSubmitting}
                                        >
                                            <span className={selectedReason ? 'text-gray-900' : 'text-gray-500'}>
                                                {selectedReason
                                                    ? REPORT_REASONS.find(reason => reason.id === selectedReason)?.label
                                                    : 'Chọn lý do báo cáo'}
                                            </span>
                                            <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                                        </button>

                                        {showDropdown && (
                                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                                {REPORT_REASONS.map(reason => (
                                                    <button
                                                        key={reason.id}
                                                        type="button"
                                                        className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${selectedReason === reason.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}`}
                                                        onClick={() => handleReasonSelect(reason.id)}
                                                    >
                                                        {reason.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Textarea cho lý do "Khác" */}
                            {selectedReason === "other" && (
                                <div className="mb-4">
                                    <label htmlFor="report-content" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nội dung báo cáo <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            id="report-content"
                                            rows="4"
                                            className={`w-full px-3 py-2 border ${charCount >= MAX_CONTENT_LENGTH ? 'border-orange-400' : 'border-gray-300'} rounded-md focus:outline-none resize-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="Mô tả vấn đề với câu hỏi này (lỗi chính tả, sai nội dung, thiếu dữ kiện...)"
                                            value={content}
                                            onChange={handleContentChange}
                                            disabled={isSubmitting}
                                            maxLength={MAX_CONTENT_LENGTH}
                                        ></textarea>
                                        <div className={`text-xs ${charCount >= MAX_CONTENT_LENGTH ? 'text-orange-500 font-medium' : 'text-gray-500'} text-right mt-1`}>
                                            {charCount}/{MAX_CONTENT_LENGTH} ký tự
                                        </div>
                                    </div>
                                </div>
                            )}

                            <p className="text-xs text-gray-500 mb-4">
                                Báo cáo của bạn sẽ được gửi đến quản trị viên để xem xét.
                            </p>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    disabled={isSubmitting}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                        isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Đang gửi...
                                        </div>
                                    ) : 'Gửi báo cáo'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportQuestionModal;
