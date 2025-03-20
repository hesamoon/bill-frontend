import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";

// utils
import { userAttr } from "../utilities/userAttr.js";

function Router() {
  // const queryClient = useQueryClient();

  // // Fetch user authentication status
  // const { data: currentUserData, isLoading } = useQuery({
  //   queryKey: ["current-user"],
  //   queryFn: getCurrentUser,
  // });

  // const location = useLocation();

  // useEffect(() => {
  //   queryClient.invalidateQueries("current-user");
  // }, [location]);

  return (
    <Routes>
      <Route
        index
        element={
          userAttr().role !== "UNSIGNED" ? (
            <HomePage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={
          userAttr().role !== "UNSIGNED" ? <Navigate to="/" /> : <LoginPage />
        }
      />
    </Routes>
  );
}

export default Router;
