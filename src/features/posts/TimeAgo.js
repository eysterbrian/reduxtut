import React from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'

export default function TimeAgo({ timestamp }) {
  let timeAgoStr = ''

  if (timestamp) {
    const date = parseISO(timestamp)
    // Generate a string showing how recently the post was created ('about a minute ago')
    const distanceToNow = formatDistanceToNow(date)
    timeAgoStr = `${distanceToNow} ago`
  }

  return (
    <span title={timestamp}>
      <i>{timeAgoStr}</i>
    </span>
  )
}
