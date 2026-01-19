import { NavLink } from "react-router-dom";
import { useFlashcardStore } from "@/store/useFlashcardStore";

const navItems = [
  { to: "/study", label: "Home" },
  { to: "/stats", label: "Stats" },
  { to: "/generate", label: "Generate" },
];
export default function NavigationRouter() {
  const selectedGroupName = useFlashcardStore(
    (state) => state.selectedGroupName
  );
  if (!selectedGroupName) {
    return null;
  }
  return (
    <nav className="flex gap-4 p-4">
      {navItems.map(({ to, label }) => {
        const resolvedPath =
          to === "/study" ? `/study/${selectedGroupName}` : to;
        return (
          <NavLink
            key={to}
            to={resolvedPath}
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold underline" : "text-blue-600"
            }
          >
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
}
