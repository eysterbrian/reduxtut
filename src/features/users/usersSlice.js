const { createSlice } = require('@reduxjs/toolkit')

const initialUsers = [
  { id: '1', name: 'Georgie' },
  { id: '2', name: 'Maple' },
  { id: '3', name: 'Brian' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {},
})

export default usersSlice.reducer

// Export selectors that encapsulate the structure of the slice's state
export const selectAllUsers = (state) => state.users

// To use this selector in useSelector() you must wrap it in a 1-arg fn that takes `state` as param
export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId)
