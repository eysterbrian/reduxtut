import { createSlice, nanoid } from '@reduxjs/toolkit'

const reactions_init = { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }

// eslint-disable-next-line
const SAMPLE_POST = {
  id: '1',
  title: 'First Post',
  content: 'howdy doo!',
  authorId: '1',
  date: new Date().toISOString(),
  reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
}

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Within createSlice, the state is just this slice's state
    postAdded: {
      reducer: (sliceState, action) => {
        // We can mutate state here since we're inside createSlice
        sliceState.posts.push(action.payload)
      },
      // A "prepare callback": Modifies the action creator to take specific args and generate payload
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(), // ok to generate random string here, just not inside reducer!
            title,
            content,
            authorId: userId,
            date: new Date().toISOString(),
            reactions: reactions_init,
          },
        }
      },
    },
    postUpdated: {
      reducer: (sliceState, action) => {
        const { id, title, content } = action.payload // Destructure entire payload to document payload obj shape
        const post = sliceState.posts.find((post) => post.id === id)
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
    reactionAdded: (sliceState, action) => {
      const { id, reaction } = action.payload
      const post = sliceState.posts.find((post) => post.id === id)
      if (post) {
        post.reactions[reaction]++
      }
    },
  },
})

export default postsSlice.reducer

// export the actions created by createSlice()
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

// Define selectors to encapsulate the structure of the slice's state

// Note that `state` is global state here rather than slice's state,
// so we have to access slice state via state.posts
export const selectAllPosts = (rootState) => rootState.posts.posts

export const selectPostById = (rootState, postId) =>
  rootState.posts.posts.find((post) => post.id === postId)
