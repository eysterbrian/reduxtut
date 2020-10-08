import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { createPost } from './postsSlice'

export default function AddPostForm() {
  // Keep local state for managing form elements
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addPostStatus, setAddPostStatus] = useState('idle')
  const dispatch = useDispatch()

  const canSave =
    [title, content, userId].every(Boolean) && addPostStatus === 'idle'

  const onSavePostClicked = async () => {
    // Only save this post if it has a title and some content
    if (canSave) {
      try {
        setAddPostStatus('pending')

        // createPost returns a Promise from dispatch
        const resultAction = await dispatch(
          createPost({ title, content, userId })
        )
        // The awaited promise will return the final action dispatched
        // which could be either createPost.fulfilled or createPost.error.
        // unwrapResult() will return either the payload from fulfilled or throw an error
        unwrapResult(resultAction)

        // Clear the form once the post has been saved
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.log('Failed to save the post', err)
      } finally {
        setAddPostStatus('idle')
      }
    }
  }

  const users = useSelector(selectAllUsers)
  if (addPostStatus !== 'idle') {
    return <div className="loader">Saving post...</div>
  }

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
