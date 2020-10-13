import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchNotifications,
  selectAllNotifications,
} from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  // The 'Refresh Notifications' button will dispatch an API call
  const dispatch = useDispatch()
  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }
  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.reduce(
    (accum, n) => accum + (!n.read ? 1 : 0),
    0
  )

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications{' '}
              {numUnreadNotifications > 0 ? (
                <span className="badge">{numUnreadNotifications}</span>
              ) : (
                ''
              )}
            </Link>
          </div>
          <button type="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
