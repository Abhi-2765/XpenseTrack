import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoggedIn } = useAuth();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/transaction", label: "Transactions" },
    { href: "/budget", label: "Budgets" },
    { href: "/groups", label: "Groups" },
  ];

  return (
    <header className="border-b border-gray-700 bg-[#111827] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 relative">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}
          >
            <img src={logo} alt="logo" className="w-44 h-10" />
          </div>

          {/* Desktop Nav - Only show if logged in */}
          {isLoggedIn && (
            <nav className="hidden md:flex items-center gap-6 text-md font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3 py-1 rounded-full transition-colors
                        ${pathname === link.href
                      ? "bg-green-500/20 text-green-400"
                      : "text-gray-400 hover:text-green-400 hover:bg-gray-800/40"}`}

                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/ai" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 text-white text-xs font-bold transition-all">
                  AI
                </Link>
                <Link to="/profile" className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all">
                  P
                </Link>
              </>
            ) : (
              // Guest Actions
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-green-900/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Button - Show for all, content depends on auth */}
          <button
            className="md:hidden w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          {isLoggedIn ? (
            <>
              <nav className="flex flex-col gap-1 pt-4 pb-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`py-3 px-4 rounded-lg transition-colors
                  ${pathname === link.href
                        ? "bg-gray-800 text-green-400"
                        : "text-gray-400 hover:bg-gray-800 hover:text-green-400"}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3 pt-3 pb-2 border-t border-gray-700">
                <Link to="/ai" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 text-white text-xs font-bold">
                  AI
                </Link>
                <Link to="/profile" className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white font-semibold">
                  P
                </Link>
              </div>
            </>
          ) : (
            // Mobile Guest Menu
            <div className="flex flex-col gap-4 pt-6 pb-4">
              <Link
                to="/login"
                className="block text-center w-full py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="block text-center w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-lg"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
