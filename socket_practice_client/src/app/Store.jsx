import { configureStore } from '@reduxjs/toolkit'
import MessagesListReducer from '../Features/Messages/MessagesList';

export const store = configureStore({
  reducer: {
    MessagesList:MessagesListReducer
  },
});