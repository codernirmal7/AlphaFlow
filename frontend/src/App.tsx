import { Navigate, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { SignIn } from "./pages/auth/SignIn";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { loginSuccess } from "./store/slices/authSlice";
import { mockUser } from "./constant";
import { SignUp } from "./pages/auth/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { ResponsiveLayout } from "./components/layout/ResponsiveLayout";
import { Tasks } from "./pages/Tasks";
import { Earnings } from "./pages/Earnings";
import { Referrals } from "./pages/Referrals";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Mock auto-login for demo purposes
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loginSuccess(mockUser));
    }
  }, [dispatch, isAuthenticated]);


  return (
    <div className="App">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn />}
        />

        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp />}
        />

        {/* Protected routes */}
        {isAuthenticated ? (
          <Route path="/" element={<ResponsiveLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="referrals" element={<Referrals />} />
          </Route>

        ) : (
          <Route path="*" element={<Navigate to="/signin" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;