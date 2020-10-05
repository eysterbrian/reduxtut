import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { postAdded } from './postsSlice'

export default function AddPostForm() {
  // Keep local state for managing form elements
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const onSavePostClicked = () => {
    console.log('Inside onSavePostClicked()...')

    // Only save this post if it has a title and some content
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
        })
      )

      // Clear the form once the post has been saved
      setTitle('')
      setContent('')
    }
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
        <button type="button" onClick={onSavePostClicked}>
          Submit New Post
        </button>
      </form>
    </section>
  )
}
