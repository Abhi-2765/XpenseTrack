import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard"},
    { href: "/transaction", label: "Transactions" },
    { href: "/budget", label: "Budgets" },
    { href: "/goals", label: "Goals" },
  ];

  return (
    <header className="border-b border-gray-700 bg-[#111827] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
              X
            </div>
            <h1 className="text-white text-xl font-bold">XpenseTrack</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-md font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${
                  link.active ? "text-white" : "text-gray-400"
                } hover:text-green-400 transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-green-600 transition-colors text-xs font-bold">
              AI
            </button>
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
              P
            </div>
          </div>

          {/* Mobile Menu Button */}
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
        <div className={`md:hidden transition-all duration-300 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
          <nav className="flex flex-col gap-1 pt-4 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${
                  link.active ? "text-white" : "text-gray-400"
                } hover:text-green-400 hover:bg-gray-800 transition-colors py-3 px-4 rounded-lg`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-3 pt-3 pb-2 border-t border-gray-700">
            <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 text-white text-xs font-bold">
              AI
            </button>
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
              P
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;