import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let loginThunk = createAsyncThunk('login-info', async (loginObj, thunkApi) => {
  let res;
  try {
    res = await axios.post("https://movie-nest-three.vercel.app/user-api/login", loginObj)
    if (res.data.message === "Login successful")
      localStorage.setItem("token", res.data.token)
    else
      return thunkApi.rejectWithValue(res.data.message)
    return res.data
  }
  catch (err) {
    return thunkApi.rejectWithValue(err)
  }
})

export let userSlice = createSlice({
  name: 'login-info',
  initialState: {
    isPending: false,
    loginStatus: false,
    currentUser: {},
    errorOccured: false,
    errMsg: ''
  },
  reducer: {
    resetState: (state, action) => {
      state.isPending = false;
      state.currentUser = {};
      state.loginStatus = false;
      state.errMsg = '';
      state.errorOccurred = false;
    }
  },
  extraReducers: builder => builder
    .addCase(loginThunk.pending, (state, action) => {
      state.isPending = true;
    })
    .addCase(loginThunk.fulfilled, (state, action) => {
      state.isPending = false;
      state.currentUser = action.payload.user;
      state.loginStatus = true;
      state.errMsg = '';
      state.errorOccurred = false;
    })
    .addCase(loginThunk.rejected, (state, action) => {
      state.isPending = false;
      state.currentUser = {};
      state.loginStatus = false;
      state.errMsg = action.payload;
      state.errorOccurred = true;
    })
})

// Export action creater function
export let { resetState } = userSlice.actions

//export root reducer
export default userSlice.reducer