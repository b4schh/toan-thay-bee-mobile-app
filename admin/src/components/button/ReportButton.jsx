import { useState } from "react";
import { Flag } from "lucide-react";
import ReportQuestionModal from "../modal/ReportQuestionModal";

const ReportButton = ({ questionId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <button
                onClick={openModal}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
                title="Báo cáo câu hỏi này"
            >
                <Flag size={14} />
                <span>Báo cáo</span>
            </button>
            
            <ReportQuestionModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                questionId={questionId} 
            />
        </>
    );
};

export default ReportButton;
