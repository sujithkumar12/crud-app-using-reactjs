import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardView from "./components/views/DashboardView";
import SearchView from "./components/views/SearchView";
import UserProfile from "./components/views/UserProfile";
import SettingsView from "./components/views/SettingsView";
import NotFound from "./components/views/NotFound";
import AddData from "./components/views/addData/AddData";
import RegisterForm from "./components/LoginForm/RegisterForm";
import { UserAuthContextProvider } from "./components/store/UserAuthContext";
import ProtectedRoute from "./components/views/ProtectedRoute";

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/"
          element={
            // <ProtectedRoute>
              <DashboardView />
            // </ProtectedRoute>
          }
        />
        <Route path="/search/:id" element={<AddData />} />
        <Route path="/myprofile" element={<UserProfile />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
