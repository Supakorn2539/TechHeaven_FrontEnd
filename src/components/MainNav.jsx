import { useState } from 'react'
import { CartIcon } from './ui/Icon'
import { Link } from 'react-router-dom';
import LoginModal from './auth/LoginModal';
import UserDropdown from './auth/UserDropdown';
import CartModal from './cart/CartModal';

const MainNav = () => {
    // State for Login
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // State incase user is Admin
    const [isAdmin, setIsAdmin] = useState(false);

    // State for open cart
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Fn when click UserIcon
    const hdlLoginIconClick = () => {
        setIsDialogOpen(true);
    };

    // Fn Mockup will change after we have admin
    const hdlLogin = () => {
        const userRole = "Admin";

        setIsLoggedIn(true);
        setIsDialogOpen(false);
        setIsAdmin(userRole === "Admin");
    };

    return (
        <div className="flex h-12 w-full items-center px-8 justify-between">

            {/* Logo */}
            <a className="text-2xl font-bold">LOGO</a>

            {/* NavBar  */}
            <div>
                <ul className="flex items-center gap-4">
                    <Link to={"/"} className="hover:scale-105 hover:-translate-y-1 hover:duration-200">
                        HOME
                    </Link>
                    <Link to={"/store"} className="hover:scale-105 hover:-translate-y-1 hover:duration-200">
                        STORE
                    </Link>
                    <Link to={"/booking"} className="hover:scale-105 hover:-translate-y-1 hover:duration-200">
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
                        <div onClick={() => setIsCartOpen(true)} className="cursor-pointer">
                            <CartIcon className="w-5 h-5 hover:scale-105 hover:-translate-y-1 hover:duration-200" />
                        </div>
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
    )
}

export default MainNav