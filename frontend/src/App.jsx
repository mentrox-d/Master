import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

      </Routes>

    </BrowserRouter>

  );

}
export default App;