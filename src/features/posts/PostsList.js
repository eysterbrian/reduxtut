import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'

export default function PostsList() {
  // useSelector has access to the entire state in all slices
  const posts = useSelector((state) => state.posts)
  return (
    <section>
      <h2>List of Posts</h2>
      {posts.map((post) => (
        <article className="post-excerpt" key={post.id}>
          <h3>{post.title}</h3>
          <PostAuthor userId={post.authorId} />
          <p>{post.content.substring(0, 100)}</p>
          <Link to={`/posts/${post.id}`}>View Post</Link>
        </article>
      ))}
    </section>
  )
}
