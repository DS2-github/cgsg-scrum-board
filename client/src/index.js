import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Session from './context/context';

const session = new Session();
export const SocketContext = React.createContext(session);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);