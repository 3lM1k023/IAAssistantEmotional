import { useState } from "react";
import { Welcome } from "./page/Welcome";
import { Chat } from "./page/Chat";
import { Register } from "./page/Register";

function App() {
  // Ahora manejamos 3 estados: 'welcome', 'register', o 'chat'
  const [currentView, setCurrentView] = useState<
    "welcome" | "register" | "chat"
  >("welcome");

  return (
    <>
      {currentView === "welcome" && (
        <Welcome
          onStart={() => setCurrentView("chat")}
          onGoToRegister={() => setCurrentView("register")}
        />
      )}

      {currentView === "register" && (
        <Register
          onRegister={() => setCurrentView("welcome")}
          onBackToLogin={() => setCurrentView("welcome")}
        />
      )}

      {currentView === "chat" && <Chat />}
    </>
  );
}

export default App;
