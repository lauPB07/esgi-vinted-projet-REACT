import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-white font-semibold" : "hover:text-teal-200";

  const publishLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-white text-teal-700 font-semibold px-4 py-1.5 rounded-full"
      : "bg-white text-teal-700 font-semibold px-4 py-1.5 rounded-full hover:bg-teal-50";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink
            to="/"
            onClick={closeMenu}
            className="text-2xl font-bold hover:text-teal-100"
          >
            Vinted Clone
          </NavLink>

          <nav className="hidden md:flex items-center gap-4 text-sm">
            <NavLink to="/" end className={linkClass}>
              Accueil
            </NavLink>
            <NavLink to="/my-articles" className={linkClass}>
              Mes annonces
            </NavLink>
            <NavLink to="/favorites" className={linkClass}>
              Favoris
            </NavLink>
            <NavLink to="/publish" className={publishLinkClass}>
              Publier
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            className="md:hidden p-2 rounded hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden border-t border-teal-500/40 bg-teal-600">
            <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col gap-3 text-sm">
              <NavLink to="/" end onClick={closeMenu} className={linkClass}>
                Accueil
              </NavLink>
              <NavLink to="/my-articles" onClick={closeMenu} className={linkClass}>
                Mes annonces
              </NavLink>
              <NavLink to="/favorites" onClick={closeMenu} className={linkClass}>
                Favoris
              </NavLink>
              <NavLink
                to="/publish"
                onClick={closeMenu}
                className={publishLinkClass}
              >
                Publier
              </NavLink>
            </div>
          </nav>
        )}
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
