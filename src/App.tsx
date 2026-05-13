import { useState } from "react";
import { Welcome } from "./page/Welcome";
import { Chat } from "./page/Chat";

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <>
      {hasStarted ? <Chat /> : <Welcome onStart={() => setHasStarted(true)} />}
    </>
  );
}

export default App;
