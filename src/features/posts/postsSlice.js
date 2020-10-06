import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post', content: 'howdy doo!', authorId: '1' },
  {
    id: '2',
    title: "Brian's Second Post",
    content: "Look at me, I'm a' postin'!",
    authorId: '2',
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Within createSlice, the state is just this slice's state
    postAdded: {
      reducer: (state, action) => {
        // We can mutate state here since we're inside createSlice
        state.push(action.payload)
      },
      // A "prepare callback": Modifies the action creator to take specific args and generate payload
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(), // ok to generate random string here, just not inside reducer!
            title,
            content,
            authorId: userId,
          },
        }
      },
    },
    postUpdated: {
      reducer: (state, action) => {
        const { id, title, content } = action.payload // Destructure entire payload to document payload obj shape
        const post = state.find((post) => post.id === id)
        if (post) {
          post.title = title
          post.content = content
        }
        // TODO: Signal an error if the post.id does not exist!
      },
      // Specify a prepare callback so the caller knows exactly what args to pass
      prepare: (id, title, content) => {
        return {
          // Create the payload from our args
          payload: { id, title, content },
        }
      },
    },
  },
})

export default postsSlice.reducer
export const { postAdded, postUpdated } = postsSlice.actions
// export const { postAdded: postsSlice.actions.postAdded }
