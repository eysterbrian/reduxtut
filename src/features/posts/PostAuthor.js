import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUserById } from '../users/usersSlice'

export default function PostAuthor({ userId }) {
  const author = useSelector((state) => selectUserById(state, userId))

  return (
    <span>
      by{' '}
      {author?.name ? (
        <Link to={`/users/${author.id}`}>{author.name}</Link>
      ) : (
        'Unknown author'
      )}{' '}
    </span>
  )
}
