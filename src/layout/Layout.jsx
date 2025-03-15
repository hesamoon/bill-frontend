// components
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  const { pathname } = useLocation();

  return pathname === "/" ? (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">{children}</div>
  );
}

export default Layout;
