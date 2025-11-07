import type { RootState } from '../store';

export const selectUser = (state: RootState) => state.user;
export const selectIsLoggedIn = (state: RootState) => state.user.loggedIn;
