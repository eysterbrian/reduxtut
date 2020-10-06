import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

export default function PostsList() {
  // useSelector has access to the entire state in all slices
  const posts = useSelector((state) => state.posts)

  const sortedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section>
      <h2>List of Posts</h2>
      {sortedPosts.map((post) => (
        <article className="post-excerpt" key={post.id}>
          <h3>{post.title}</h3>
          <PostAuthor userId={post.authorId} />
          (<TimeAgo timestamp={post.date} />)
          <p>{post.content.substring(0, 100)}</p>
          <Link to={`/posts/${post.id}`}>View Post</Link>
          <ReactionButtons post={post} />
        </article>
      ))}
    </section>
  )
}
