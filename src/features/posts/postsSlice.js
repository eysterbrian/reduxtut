import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post', content: 'howdy doo!' },
  {
    id: '2',
    title: "Brian's Second Post",
    content: "Look at me, I'm a' postin'!",
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Within createSlice, the state is just this slice's state
    postAdded: (state, action) => {
      // We can mutate state here since we're inside createSlice
      state.push(action.payload)
    },
  },
})

export default postsSlice.reducer
export const { postAdded } = postsSlice.actions
// export const { postAdded: postsSlice.actions.postAdded }
