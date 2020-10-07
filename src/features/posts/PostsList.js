import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postsSlice'

export default function PostsList() {
  // useSelector has access to the entire state in all slices
  const posts = useSelector(selectAllPosts)
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
    const sortedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
    content = sortedPosts.map((post) => (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <PostAuthor userId={post.user} />
        (<TimeAgo timestamp={post.date} />)
        <p>{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`}>View Post</Link>
        <ReactionButtons post={post} />
      </article>
    ))
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  )
}
