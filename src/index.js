import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import memoryUtils from '@utils/memoryUtils'
import storageUtils from '@utils/storageUtils'

const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(
<BrowserRouter>
    <App />
</BrowserRouter>, document.getElementById('root'))