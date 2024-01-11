import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landing'
import Payment from './pages/payment'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/pay' element={<Payment />} />
    </Routes>
  )
}

export default App
