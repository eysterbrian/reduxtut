import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

import './api/server'
import { fetchUsers } from './features/users/usersSlice'

// Users won't change much, so fetch them prior to creating DOM tree
//
// NOTE: We can access store directly from here so no need for useDispatch
// useDispatch wouldn't work anyway b/c we're outside the Provider!
store.dispatch(fetchUsers())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
