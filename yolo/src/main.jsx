import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'

import App from './App'

axios.get('/api/proposals').then(response => {
    const responses = response.data
    ReactDOM.createRoot(document.getElementById('root')).render(<App responses={responses} />)
})
