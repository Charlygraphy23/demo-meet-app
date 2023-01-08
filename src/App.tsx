import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import io from 'socket.io-client'
import Routers from './routes';
import { addSocketAction } from './store/actions';

function App() {

  const socket = io('http://localhost:3001');
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('connect', () => {
      console.log("connect", socket)
      dispatch(addSocketAction(socket))
    });

    socket.on('disconnect', () => {
      console.log("disconnect")
    });


    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [])

  
  return (
    <BrowserRouter >
      <Routers/>
    </BrowserRouter>
  )
}

export default App
