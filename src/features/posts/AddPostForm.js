import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { postAdded } from './postsSlice'

export default function AddPostForm() {
  // Keep local state for managing form elements
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const dispatch = useDispatch()

  const onSavePostClicked = () => {
    // Only save this post if it has a title and some content
    if (title && content) {
      dispatch(postAdded(title, content, userId))

      // Clear the form once the post has been saved
      setTitle('')
      setContent('')
      setUserId('')
    }
  }

  const users = useSelector(selectAllUsers)

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  return (
    <section>
      <h2>Add a new postie</h2>
      <form>
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <label htmlFor="postContent">Content of the Post</label>
        <textarea
          name="postContent"
          id="postContent"
          cols="30"
          onChange={(evt) => setContent(evt.target.value)}
          rows="10"
          value={content}
        />
        <label htmlFor="author">Post author</label>
        <select
          name="author"
          id="author"
          onChange={(evt) => setUserId(evt.target.value)}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Submit New Post
        </button>
      </form>
    </section>
  )
}
