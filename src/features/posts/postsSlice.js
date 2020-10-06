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
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload // Destructure entire payload to document payload obj shape
      const post = state.find((post) => post.id === id)
      if (post) {
        post.title = title
        post.content = content
      }
      // TODO: Signal an error if the post.id does not exist!
    },
  },
})

export default postsSlice.reducer
export const { postAdded, postUpdated } = postsSlice.actions
// export const { postAdded: postsSlice.actions.postAdded }
