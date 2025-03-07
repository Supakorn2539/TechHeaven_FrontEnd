import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import LoginModal from "../auth/LoginModal";
import UserDropdown from "../auth/UserDropdown";
import useAuthStore from "../../stores/authStore";
import TechLogo from "@/assets/image/logo.png";

const AdminNav = () => {
  const currentUser = useAuthStore((state) => state.user);

  // State for Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State incase user is Admin
  const [isAdmin, setIsAdmin] = useState(false);

  // Fn when click UserIcon
  const hdlLoginIconClick = () => {
    setIsDialogOpen(true);
  };

  // Fn handle login
  const hdlLogin = () => {
    if (currentUser) {
      setIsLoggedIn(true);
      setIsDialogOpen(false);
      setIsAdmin(currentUser.role === "ADMIN");
    }
  };

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
      setIsAdmin(currentUser.role === "ADMIN");
    }
  }, [currentUser]);

  return (
    <div className="flex h-12 w-full items-center px-8 py-6 justify-between sticky top-0 bg-white/70 backdrop-blur-lg shadow-lg rounded-md z-10">
      {/* Logo with link to Home */}
      <Link to="/">
        <img src={TechLogo} alt="Tech Logo" className="h-10 w-10 cursor-pointer" />
      </Link>

      {/* NavBar  */}
      <div>
        <ul className="flex items-center gap-4">
          <Link
            to="/"
            className="hover:scale-105 hover:-translate-y-1 hover:duration-200"
          >
            HOME
          </Link>
          <Link
            to="/store"
            className="hover:scale-105 hover:-translate-y-1 hover:duration-200"
          >
            STORE
          </Link>
          <Link
            to="/booking"
            className="hover:scale-105 hover:-translate-y-1 hover:duration-200"
          >
            BOOKING
          </Link>
          <li>
            {!isLoggedIn && (
              <button
                onClick={hdlLoginIconClick}
                className="hover:scale-105 hover:-translate-y-1 hover:duration-200"
              >
                LOGIN
              </button>
            )}

            {isLoggedIn && (
              <UserDropdown
                setIsDialogOpen={setIsDialogOpen}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            )}
          </li>
          <li>
            <ShoppingBag className="w-5 h-5 hover:scale-105 hover:-translate-y-1 hover:duration-200" />
          </li>
        </ul>
      </div>

      {/* Show Dialog Login */}
      <LoginModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onLogin={hdlLogin}
      />
    </div>
  );
};

export default AdminNav;
