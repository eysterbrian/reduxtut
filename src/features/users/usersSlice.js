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
