import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";

// Services
import { getCurrentUser } from "../services/user";

function Router() {
  const queryClient = useQueryClient();

  // Fetch user authentication status
  const { data: currentUserData, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    queryClient.invalidateQueries(["current-user"]);
  }, []);

  return (
    <Routes>
      <Route
        index
        element={
          currentUserData?.data?.message === "Verified" ? (
            <HomePage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={
          currentUserData?.data?.message === "Verified" ? (
            <Navigate to="/" />
          ) : (
            <LoginPage />
          )
        }
      />
    </Routes>
  );
}

export default Router;
