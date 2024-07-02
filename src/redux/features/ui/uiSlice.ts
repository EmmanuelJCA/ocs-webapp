import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

interface UiState {
  isDragging: boolean;
}

const initialState: UiState = {
  isDragging: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startDragging: (state) => {
      state.isDragging = true;
    },
    endDragging: (state) => {
      state.isDragging = false;
    },
  },
});

export default uiSlice.reducer;

export const { startDragging, endDragging } = uiSlice.actions;
