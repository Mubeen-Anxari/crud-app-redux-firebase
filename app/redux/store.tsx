import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slice'

export const store = configureStore({
  reducer: {
    Todo:counterSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch