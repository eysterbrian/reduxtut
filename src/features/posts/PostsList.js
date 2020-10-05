import React from 'react'
import { useSelector } from 'react-redux'

export default function PostsList() {
  // useSelector has access to the entire state in all slices
  const posts = useSelector((state) => state.posts)
  return (
    <section>
      <h2>List of Posts</h2>
      {posts.map((post) => (
        <article className="post-excerpt" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}</p>
        </article>
      ))}
    </section>
  )
}
