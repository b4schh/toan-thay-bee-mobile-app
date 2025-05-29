import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as examApi from '../../services/examApi';
import {
  setScreenCurrentPage,
  setScreenTotalPages,
  setScreenTotalItems,
} from '../filter/filterSlice';
import { apiHandler } from '../../utils/apiHandler';

export const fetchExams = createAsyncThunk(
  'exams/fetchExams',
  async (data, { dispatch }) => {
    return await apiHandler(
      dispatch,
      examApi.getAllExamAPI,
      data,
      (data) => {
        dispatch(
          setScreenCurrentPage({ screen: 'exam', page: data.currentPage }),
        );
        dispatch(
          setScreenTotalPages({ screen: 'exam', totalPages: data.totalPages }),
        );
        dispatch(
          setScreenTotalItems({ screen: 'exam', totalItems: data.totalItems }),
        );
      },
      true,
      false,
    );
  },
);

export const fetchSavedExams = createAsyncThunk(
  'exams/fetchSavedExams',
  async (_, { dispatch }) => {
    return await apiHandler(
      dispatch,
      examApi.getSavedExams,
      null,
      () => {},
      true,
      false,
    );
  },
);

export const fetchPublicExams = createAsyncThunk(
  'exams/fetchPublicExams',
  async (data, { dispatch }) => {
    return await apiHandler(
      dispatch,
      examApi.getAllPublicExamAPI,
      data,
      (data) => {
        dispatch(
          setScreenCurrentPage({ screen: 'exam', page: data.currentPage }),
        );
        dispatch(
          setScreenTotalPages({ screen: 'exam', totalPages: data.totalPages }),
        );
        dispatch(
          setScreenTotalItems({ screen: 'exam', totalItems: data.totalItems }),
        );
      },
      false,
      true,
    );
  },
);

export const fetchExamById = createAsyncThunk(
  'exams/fetchExamById',
  async (id, { dispatch }) => {
    return await apiHandler(
      dispatch,
      examApi.getExamById,
      id,
      () => {},
      true,
      false,
    );
  },
);

export const fetchPublicExamById = createAsyncThunk(
  'exams/fetchPublicExamById',
  async (data, { dispatch }) => {
    return await apiHandler(
      dispatch,
      examApi.getExamPublic,
      data,
      () => {},
      true,
      false,
    );
  },
);

export const saveExamForUser = createAsyncThunk(
  'exams/saveExamForUser',
  async ({ examId }, { dispatch }) => {
    return await apiHandler(
      dispatch,
      examApi.saveExamForUserAPI,
      { examId },
      () => {},
      true,
      false,
    );
  },
);

export const submitExam = createAsyncThunk(
  'exams/submitExam',
  async ({ attemptId }, { dispatch }) => {
    return await apiHandler(
      dispatch,
      examApi.submitExamAPI,
      { attemptId },
      () => {},
      true,
      true,
    );
  },
);

const examSlice = createSlice({
  name: 'exams',
  initialState: {
    exams: [],
    exam: null,
    timeLeft: 0,
    isTimerRunning: false,
    initialDuration: 0,
    examDetail: null,
    examsSaved: [],
    submitResult: null,
    isSubmitting: false,
    submitError: null,
  },
  reducers: {
    setExam: (state, action) => {
      state.exam = action.payload;
    },
    initializeTimer: (state, action) => {
      state.timeLeft = action.payload;
      state.initialDuration = action.payload;
      state.isTimerRunning = true;
    },
    decrementTimer: (state) => {
      if (state.timeLeft > 0 && state.isTimerRunning) {
        state.timeLeft -= 1;
      }
    },
    pauseTimer: (state) => {
      state.isTimerRunning = false;
    },
    resumeTimer: (state) => {
      state.isTimerRunning = true;
    },
    resetTimer: (state) => {
      state.timeLeft = state.initialDuration;
      state.isTimerRunning = false;
    },
    clearSubmitResult: (state) => {
      state.submitResult = null;
      state.submitError = null;
      state.isSubmitting = false;
    },
    resetExamState: (state) => {
      state.timeLeft = 0;
      state.isTimerRunning = false;
      state.initialDuration = 0;
      state.submitResult = null;
      state.submitError = null;
      state.isSubmitting = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.pending, (state) => {
        state.exams = [];
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        if (action.payload) {
          state.exams = action.payload.data;
        }
      })
      .addCase(fetchSavedExams.pending, (state) => {
        state.examsSaved = [];
      })
      .addCase(fetchSavedExams.fulfilled, (state, action) => {
        if (action.payload) {
          // API getSavedExams đã trả về chỉ các đề thi đã lưu (isSave = true)
          state.examsSaved = action.payload.data;
        }
      })
      .addCase(fetchExamById.pending, (state) => {
        state.exam = null;
      })
      .addCase(fetchExamById.fulfilled, (state, action) => {
        if (action.payload) {
          state.exam = action.payload.data;
        }
      })
      .addCase(fetchPublicExams.pending, (state) => {
        state.exams = [];
      })
      .addCase(fetchPublicExams.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.exams = action.payload.data;
        }
      })
      .addCase(fetchPublicExamById.pending, (state) => {
        state.examDetail = null;
      })
      .addCase(fetchPublicExamById.fulfilled, (state, action) => {
        if (action.payload) {
          state.examDetail = action.payload.data;
        }
      })
      .addCase(saveExamForUser.fulfilled, (state, action) => {
        if (action.payload) {
          const { examId, isSave } = action.payload;

          // Update exams list
          if (state.exams)
            state.exams.map((exam) => {
              exam.isSave = exam.id === examId ? isSave : exam.isSave;
              return exam;
            });

          // Update current exam
          if (state.exam) state.exam.isSave = isSave;

          // Update exam detail
          if (state.examDetail && state.examDetail.id === examId) {
            state.examDetail.isSave = isSave;
          }

          // Update saved exams list
          if (isSave) {
            // If exam was saved, add it to saved exams if not already there
            const examToAdd =
              state.exams?.find((exam) => exam.id === examId) ||
              state.exam ||
              state.examDetail;

            if (
              examToAdd &&
              !state.examsSaved.some(
                (item) =>
                  item.id === examId || (item.exam && item.exam.id === examId),
              )
            ) {
              state.examsSaved.push({
                exam: examToAdd,
                isDone: examToAdd.isDone || false,
              });
            }
          } else {
            // If exam was unsaved, remove it from saved exams
            state.examsSaved = state.examsSaved.filter((item) => {
              const itemId = item.id || item.exam?.id;
              return itemId !== examId;
            });
          }
        }
      })
      .addCase(submitExam.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
        state.submitResult = null;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.isSubmitting = false;
        if (action.payload) {
          state.submitResult = action.payload.data;
          // Stop timer when exam is submitted
          state.isTimerRunning = false;
          state.timeLeft = 0;

          // Update exam status to done if we have the exam data
          if (state.examDetail) {
            state.examDetail.isDone = true;
          }
          if (state.exam) {
            state.exam.isDone = true;
          }

          // Update exams list
          if (state.exams && state.submitResult) {
            state.exams = state.exams.map((exam) => {
              // Assuming we can identify the exam by some means
              // You might need to pass examId in the submit action
              return exam;
            });
          }
        }
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.error.message || 'Có lỗi xảy ra khi nộp bài';
      });
  },
});

export const {
  setExam,
  initializeTimer,
  decrementTimer,
  pauseTimer,
  resumeTimer,
  resetTimer,
  clearSubmitResult,
  resetExamState,
} = examSlice.actions;

export default examSlice.reducer;
