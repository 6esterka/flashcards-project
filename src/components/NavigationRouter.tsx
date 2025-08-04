import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/stats", label: "Stats" },
  { to: "/generate", label: "Generate" },
];
function NavigationRouter() {
  return (
    <nav className="flex gap-4 p-4">
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-bold underline"
              : "text-blue-600"
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavigationRouter;