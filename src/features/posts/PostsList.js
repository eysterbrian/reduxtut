import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, selectPostIds } from './postsSlice'
import PostExcerpt from './PostExcerpt'

export default function PostsList() {
  // useSelector has access to the entire state in all slices
  const orderedPostIds = useSelector(selectPostIds)
  const dispatch = useDispatch()

  const postsStatus = useSelector((rootState) => rootState.posts.status)
  const error = useSelector((rootState) => rootState.posts.error)

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  let content = ''

  if (postsStatus === 'pending') {
    content = <div className="loader">Loading...</div>
  } else if (postsStatus === 'error') {
    content = <div>{error}</div>
  } else if (postsStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt postId={postId} key={postId} />
    ))
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  )
}
