import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header dir="rtl" className="sticky inset-x-0 top-0 z-50 w-full border-b border-gray-800 bg-gray-950">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo / Title */}
          <h1 className="text-xl font-bold text-white">
            داشبورد تحلیل داده‌ها
          </h1>

          {/* Desktop Menu */}
          <div className="hidden gap-6 text-sm text-gray-300 md:flex">
            <a
              href="/"
              className="transition-colors hover:text-white"
            >
              داشبورد
            </a>

            <Link
              to="/aboutproject"
              className="transition-colors hover:text-white"
            >
              درباره پروژه
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg p-2 text-gray-300 transition hover:bg-gray-800 hover:text-white md:hidden"
            aria-label="باز کردن منو"
          >
            ☰
          </button>
        </nav>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Mobile Side Menu */}
      <aside
        dir="rtl"
        className={`fixed right-0 top-0 z-50 h-full w-100 transform bg-gray-950 p-6 shadow-2xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            منو
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-xl text-gray-400 transition hover:bg-gray-800 hover:text-white"
            aria-label="بستن منو"
          >
            ×
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <a
            href="/"
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
          >
            داشبورد
          </a>

          <Link
            to="/aboutproject"
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
          >
            درباره پروژه
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Header;