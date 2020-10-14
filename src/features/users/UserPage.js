import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'
import { Link, Redirect } from 'react-router-dom'

export default function UserPage({ match }) {
  const { userId } = match.params

  const user = useSelector((state) => selectUserById(state, userId))

  // Get all the posts written by this user
  //
  // To get the performance benefits of useSelector (e.g. not triggering re-render
  // if selection hasn't changed) useSelector's return value must be reference-equal to
  // the previous value.  So we use the memoized selectPostsByUser selector,
  // generated via reselect's createSelector() fn), which will return same value if
  // its inputs are the same.
  const userPosts = useSelector((state) => selectPostsByUser(state, userId))

  // TODO: We only fetch posts from PostsPage, so userPosts could be empty
  // if we haven't hit that page yet

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
