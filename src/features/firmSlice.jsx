import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firms: [],
  loading: false,
  error: false,
};

const firmSlice = createSlice({
  name: "firm",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    firmSuccess: (state, { payload }) => {
      state.loading = false;
      state.firms = payload.data;
      state.error = false;
    },
    createFirmSuccess: (state, { payload }) => {
      state.loading = false;
      state.firms = [...state.firms, payload.data];
      state.error = false;
    },

    updateFirmSuccess: (state, { payload }) => {
      state.loading = false;
      const filteredFirms = state.firms.filter(firm => firm._id !== payload.data._id);
      state.firms = [...filteredFirms, payload.data];
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  firmSuccess,
  fetchFail,
  createFirmSuccess,
  updateFirmSuccess,
} = firmSlice.actions;
export default firmSlice.reducer;
