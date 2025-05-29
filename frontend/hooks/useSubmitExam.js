import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { submitExam, clearSubmitResult, resetExamState } from '../features/exam/examSlice';

export const useSubmitExam = () => {
  const dispatch = useDispatch();
  const { 
    submitResult, 
    isSubmitting, 
    submitError,
    timeLeft,
    isTimerRunning 
  } = useSelector((state) => state.exams);

  const handleSubmitExam = useCallback(async (attemptId) => {
    if (!attemptId) {
      throw new Error('attemptId là bắt buộc');
    }

    try {
      const result = await dispatch(submitExam({ attemptId })).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const clearSubmit = useCallback(() => {
    dispatch(clearSubmitResult());
  }, [dispatch]);

  const resetExam = useCallback(() => {
    dispatch(resetExamState());
  }, [dispatch]);

  return {
    // Actions
    submitExam: handleSubmitExam,
    clearSubmitResult: clearSubmit,
    resetExamState: resetExam,
    
    // State
    submitResult,
    isSubmitting,
    submitError,
    timeLeft,
    isTimerRunning,
    
    // Computed states
    isExamCompleted: !!submitResult,
    hasSubmitError: !!submitError,
  };
};

export default useSubmitExam;