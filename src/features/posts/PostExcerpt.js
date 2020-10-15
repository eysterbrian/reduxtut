import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'

export default React.memo(function PostExcerpt({ post }) {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <PostAuthor userId={post.user} />
      (<TimeAgo timestamp={post.date} />)<p>{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`}>View Post</Link>
      <ReactionButtons post={post} />
    </article>
  )
})
