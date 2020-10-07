import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers', // Action type
  async () => {
    // payload creator callback
    const response = await client('/fakeApi/users')
    return response.users
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (sliceState, action) => {
      console.log('Inside fetchUsers...', action.payload)
      // Add all the users to the current state
      return action.payload
    },
  },
})

export default usersSlice.reducer

// Export selectors that encapsulate the structure of the slice's state
export const selectAllUsers = (rootState) => rootState.users

// To use this selector in useSelector() you must wrap it in a 1-arg fn that takes `state` as param
export const selectUserById = (rootState, userId) =>
  rootState.users.find((user) => user.id === userId)
