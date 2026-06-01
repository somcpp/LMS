import React from 'react'
import {Route,Routes} from 'react-router-dom'
import { Button } from './components/ui/button'
import { Auth } from './pages/Auth'


const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
    </div>
  )
}

export default App