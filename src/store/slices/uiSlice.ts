import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isDarkMode: boolean;
  sidebarOpen: boolean;
}

const initialState: UiState = {
  isDarkMode: false,
  sidebarOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarState: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { toggleTheme, toggleSidebar, setSidebarState } = uiSlice.actions;
export default uiSlice.reducer;