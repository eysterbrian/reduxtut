import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    console.log('Inside fetchNotifications...')

    // Get the timestamp of the most recent notification
    // TODO: Can't we just grab the latest notification directly, rather than getting all?
    const allNotifications = selectAllNotifications(getState())
    const latestNotification = allNotifications[0]
    const latestTimestamp = latestNotification ? latestNotification.data : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.notifications
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [], //--- { id, date, message, user }
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      // Payload will contain an array of notifications
      state.push(...action.payload)

      // Sort the notifications by date, in case new fetch retrieves some out of order
      state.sort((a, b) => b.date.localeCompare(a.date))
    },
  },
})

export default notificationsSlice.reducer

// slice selectors
export const selectAllNotifications = (state) => state.notifications
