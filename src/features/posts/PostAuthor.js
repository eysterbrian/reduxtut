import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'

export default function PostAuthor({ userId }) {
  const author = useSelector((state) => selectUserById(state, userId))
  return <span>by {author?.name ? author.name : 'Unknown author'} </span>
}
