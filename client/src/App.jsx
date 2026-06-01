import React from 'react'
import {Route,Routes} from 'react-router-dom'
import { Button } from './components/ui/button'
import { Auth } from './pages/Auth'
import Home from './pages/Home'


const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App