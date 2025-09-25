import { Navigate, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { SignIn } from "./pages/auth/SignIn";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { loginSuccess } from "./store/slices/authSlice";
import { mockUser } from "./constant";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Mock auto-login for demo purposes
  useEffect(() => {
    const savedAuth = localStorage.getItem('earnhub_demo_auth');
    if (savedAuth && !isAuthenticated) {
      dispatch(loginSuccess(mockUser));
    }
  }, [dispatch, isAuthenticated]);

  // Save auth state for demo persistence
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('earnhub_demo_auth', 'true');
    } else {
      localStorage.removeItem('earnhub_demo_auth');
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn />}
        />

        {/* Protected routes */}
        {isAuthenticated ? (
          <Route path="/" element={<></>}>
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/signin" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;