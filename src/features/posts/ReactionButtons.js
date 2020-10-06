import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

// Note that we pass the complete post here (rather than just the reactions obj) so that
//    we'll have the post.id for the reactionAdded action
export default function ReactionButtons({ post }) {
  const dispatch = useDispatch()

  return (
    <div>
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          className="muted-button reaction-button"
          key={name}
          onClick={(evt) =>
            dispatch(reactionAdded({ id: post.id, reaction: name }))
          }
        >
          {emoji} {post.reactions[name]}
        </button>
      ))}
    </div>
  )
}
