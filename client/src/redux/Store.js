import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

export let Store = configureStore({
  reducer: {
    loginReducer: userReducer
  }
})