import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000"); // endereço do back-end

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Ligado ao servidor! ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Desligado do servidor.");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Cartas Contra Tugas</h1>
      <p>Socket ID: {socket.id}</p>
    </div>
  );
}

export default App;
