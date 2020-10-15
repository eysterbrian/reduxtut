import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import { selectPostById } from './postsSlice'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'

export default function PostExcerpt({ postId }) {
  const post = useSelector((state) => selectPostById(state, postId))

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user} />
      (<TimeAgo timestamp={post.date} />)<p>{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`}>View Post</Link>
      <ReactionButtons post={post} />
    </article>
  )
}
