import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/landing'
import Payment from './pages/payment'
import ErrorPayment from './pages/error-payment'
import SuccessPayment from './pages/success-payment'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/pay' element={<Payment />} />
      <Route path='/error' element={<ErrorPayment />} />
      <Route path='/success' element={<SuccessPayment />} />
    </Routes>
  )
}

export default App
