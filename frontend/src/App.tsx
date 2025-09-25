import { Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

function App() {

  return (
    <>
      <AppContent />
    </>
  )
}

export default App
