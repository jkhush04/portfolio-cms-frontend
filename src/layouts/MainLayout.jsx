  import { Outlet, NavLink } from "react-router-dom";

  const links = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/skills", label: "Skills" },
    { to: "/experience", label: "Experience" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  export default function MainLayout() {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 bg-white/80 backdrop-blur border-b z-10">
          <nav className="max-w-8xl mx-auto flex items-center justify-between px-6 py-4">
            <NavLink to="/" className="font-bold text-lg tracking-tight">
              Khushi Jain
            </NavLink>
            <div className="flex gap-6 text-sm">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    isActive ? "text-[var(--color-accent)] font-medium" : "text-gray-600 hover:text-black"
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </header>

        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
          <Outlet />
        </main>

        <footer className="border-t py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Khushi Jain
        </footer>
      </div>
    );
  }