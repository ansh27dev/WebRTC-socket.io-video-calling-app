import { Routes,Route } from 'react-router-dom'
import Homepage from './pages/Home'
import './App.css'
import { SocketProvider } from './providers/socket'


function App() {

  return (
   <div>
<SocketProvider>
   <Routes>
<Route path="/" element={<Homepage/>}/>
   </Routes>
</SocketProvider>
   </div>
  )
}

export default App
