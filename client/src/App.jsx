import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/home';
import './App.css';
import { SocketProvider } from './providers/socket';

function App() {
  return (
    <SocketProvider>
      <Routes>
      <Route path="/" element={<Homepage />} />
        <Route path="/room/:roomId" element={<h1>Room</h1 >} />

      </Routes>
    </SocketProvider>
  );
}

export default App
