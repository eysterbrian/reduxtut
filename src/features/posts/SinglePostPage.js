import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

// NOTE: This component expects the postId to be passed as
// a match.params from React Router
export default function SinglePostPage({ match }) {
  const { postId } = useParams() // Access match.params.postId
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )
  if (!post) {
    return (
      <section>
        <h2>Sorry, that post does not exist!</h2>
      </section>
    )
  }
  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.authorId} />
        (<TimeAgo timestamp={post.date} />)
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`}>Edit Post</Link>
      </article>
    </section>
  )
}
