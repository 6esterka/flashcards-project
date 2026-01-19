import { NavLink } from "react-router-dom";
import { useFlashcardStore } from "@/store/useFlashcardStore";
import { uiText } from "@/constants/uiText";

const navItems = [
  { to: "/study", label: uiText.home.pageRouteTitle },
  { to: "/stats", label: uiText.stats.pageRouteTitle },
  { to: "/generate", label: uiText.generate.pageRouteTitle},
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
