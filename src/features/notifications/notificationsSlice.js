import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const notificationsAdapter = createEntityAdapter({
  // Keep the IDs sorted by the date of the notification
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    console.log('Inside fetchNotifications...')

    // Get the timestamp of the most recent notification
    // TODO: Can't we just grab the latest notification directly, rather than getting all?
    const allNotifications = selectAllNotifications(getState())
    const latestNotification = allNotifications[0]
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.notifications
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(), //--- { id, date, message, user, isNew, read }
  reducers: {
    // Mark all notifications as read
    allNotificationsRead: (state, action) => {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      // Any 'read' notifications are no longer new
      // Inside the slice file we can iterate over entities, but outside this file we'll
      // use the selectAll selector with useSelector
      Object.values(state.entities).forEach(
        (notification) => (notification.isNew = !notification.read)
      )

      // Payload will contain an array of notifications
      // NOTE that the params to all adapter CRUD functions includes state
      notificationsAdapter.upsertMany(state, action.payload)
    },
  },
})

export default notificationsSlice.reducer

// action creators
export const { allNotificationsRead } = notificationsSlice.actions

// slice selectors
export const {
  selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors((rootState) => rootState.notifications)

// (state) => state.notifications
