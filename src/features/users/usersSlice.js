import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

// Simple entity adapter for users with no custom sorting or initialState
const usersAdapter = createEntityAdapter()

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
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (sliceState, action) => {
      console.log('Inside fetchUsers...', action.payload)
      // Add all the users to the current state
      return usersAdapter.setAll(sliceState, action)
    },
  },
})

export default usersSlice.reducer

// Export selectors that encapsulate the structure of the slice's state
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((rootState) => rootState.users)
