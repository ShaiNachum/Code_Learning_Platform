import { Routes, Route } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import CodeBlockPage from "./pages/CodeBlockPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LobbyPage />} />
      <Route path="/code/:id" element={<CodeBlockPage />} />
    </Routes>
  );
};

export default App;