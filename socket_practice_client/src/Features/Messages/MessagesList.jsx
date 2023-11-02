import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  messagesList: [],
  isLoading: false,
  isError: false,
};

const messageListSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    sendMessages:(state,action)=>{

    },
  },
  extraReducers: {},
});

export const {sendMessages}=messageListSlice.actions;
export default messageListSlice.reducer
