import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { postUpdated } from './postsSlice'

export default function EditPostForm() {
  const { postId } = useParams()

  const origPost = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  // Note the use of the "optional chaining" syntax "?." in case origPost was not found
  const [title, setTitle] = useState(origPost?.title)
  const [content, setContent] = useState(origPost?.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
    }
  }

  if (!origPost) {
    return (
      <section>
        <h2>Sorry, that post does not exist!</h2>
      </section>
    )
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form method="post">
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <label htmlFor="postContent">Post Content</label>
        <textarea
          name="postContent"
          id="postContent"
          cols="30"
          rows="10"
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
        />
        <button type="button" onClick={onSavePostClicked}>
          Update Post
        </button>
      </form>
    </section>
  )
}
