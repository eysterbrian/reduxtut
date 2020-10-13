import { formatDistanceToNow } from 'date-fns/esm'
import { parseISO } from 'date-fns/esm/fp'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { selectAllUsers } from '../users/usersSlice'
import {
  allNotificationsRead,
  selectAllNotifications,
} from './notificationsSlice'

export default function NotificationsList() {
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()
  const numNotifications = notifications.length

  useEffect(() => {
    dispatch(allNotificationsRead())
  }, [numNotifications, dispatch])

  return (
    <section>
      <h2>Notifications</h2>
      {notifications.map((notification) => {
        const date = parseISO(notification.date)
        const timeAgo = formatDistanceToNow(date)
        const user = users.find((user) => user.id === notification.user) || {
          name: 'Unknown User',
        }
        const notificatonClassnames = classnames('notification', {
          new: notification.isNew,
        })
        return (
          <div key={notification.id} className={notificatonClassnames}>
            <div>
              <b>{user.name}</b> {notification.message}
            </div>
            <div title={notification.date}>
              <i>{timeAgo} ago</i>
            </div>
          </div>
        )
      })}
    </section>
  )
}
