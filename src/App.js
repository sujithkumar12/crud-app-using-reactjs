import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import DashboardView from "./components/views/DashboardView";
import NotFound from "./components/views/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DashboardView />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
