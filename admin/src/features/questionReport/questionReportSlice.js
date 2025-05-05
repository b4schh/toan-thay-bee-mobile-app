import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as questionReportApi from "../../services/questionReportApi";
import { setCurrentPage, setTotalPages, setTotalItems } from "../filter/filterSlice";
import { apiHandler } from "../../utils/apiHandler";

export const postQuestionReport = createAsyncThunk(
    "questionReports/postQuestionReport",
    async (reportData, { dispatch }) => {
        return await apiHandler(dispatch, questionReportApi.postQuestionReportAPI, { reportData }, () => { }, true, false);
    }
);

export const fetchQuestionReports = createAsyncThunk(
    "questionReports/fetchQuestionReports",
    async ({ search, currentPage, limit, sortOrder }, { dispatch }) => {
        return await apiHandler(dispatch, questionReportApi.getQuestionReportsAPI, { search, page: currentPage, limit, sortOrder }, (data) => {
            dispatch(setCurrentPage(data.currentPage));
            dispatch(setTotalPages(data.totalPages));
            dispatch(setTotalItems(data.totalItems));
        }, true, false);
    }
);

export const deleteQuestionReport = createAsyncThunk(
    "questionReports/deleteQuestionReport",
    async (id, { dispatch }) => {
        return await apiHandler(dispatch, questionReportApi.deleteQuestionReportAPI, id, () => { }, true, false);
    }
);



const questionReportSlice = createSlice({
    name: "questionReports",
    initialState: {
        questionReports: [],
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestionReports.pending, (state) => {
                state.questionReports = [];
            })
            .addCase(fetchQuestionReports.fulfilled, (state, action) => {
                state.questionReports = action.payload.data;
            })
            .addCase(deleteQuestionReport.fulfilled, (state, action) => {
                state.questionReports = state.questionReports.filter((questionReport) => questionReport.id != action.payload.questionId);
            })
    },
});

export default questionReportSlice.reducer;
