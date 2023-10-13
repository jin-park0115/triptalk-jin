import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './tokenSlice';
import mapAddress from './mapAddress';
import editMyInfoSlice from './editMyInfoSlice';

export const store = configureStore({
  reducer: {
    address: mapAddress,
    token: tokenSlice,
    editMyInfo: editMyInfoSlice, // 개인정보수정
  },
});

export type RootState = ReturnType<typeof store.getState>;
