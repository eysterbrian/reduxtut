import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import { selectAllPosts } from '../posts/postsSlice'
import { Link, Redirect } from 'react-router-dom'

export default function UserPage({ match }) {
  const { userId } = match.params

  const user = useSelector((state) => selectUserById(state, userId))
  // Get all the posts written by this user
  // TODO: Seems very inefficient to do this every render!!!
  // TODO: We only fetch posts from PostsPage, so this could be empty if we haven't hit that page yet
  const userPosts = useSelector(selectAllPosts).filter(
    (post) => post.user === userId
  )

  // If User doesn't exist then redirect to the main users page
  if (!user) {
    return <Redirect to="/users" />
  }

  let postTitles
  if (userPosts.length) {
    postTitles = (
      <ul>
        {userPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    )
  } else {
    postTitles = <p>No posts yet for this user</p>
  }

  return (
    <section>
      <h2>All Posts by {user.name}</h2>
      {postTitles}
    </section>
  )
}
