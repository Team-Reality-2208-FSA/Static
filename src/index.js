import React from 'react'
import { createRoot } from 'react-dom/client'

/* Import and destructure main from src/component/index.js  */
import { Main } from './components'
import { Provider } from 'react-redux'
import store from './store'

import { BrowserRouter as Router } from 'react-router-dom'

const container = document.getElementById('root')
const root = createRoot(container)
// root for react and routers as well as redux
root.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>
)
