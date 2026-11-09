import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import HomePage from "./pages/HomePage";

// Secondary routes are split out of the initial bundle and only fetched when
// they are actually visited (Profile is also preloaded on hover).
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

const PageLoader = () => (
  <div className="flex h-screen items-center justify-center bg-background">
    <Loader2 className="size-8 animate-spin text-muted-foreground" />
  </div>
);

const App = () => {
  const { authUser, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/profile"
            element={
              authUser ? <ProfilePage /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
