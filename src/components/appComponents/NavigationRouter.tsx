import { NavLink } from "react-router-dom";
import { useFlashcardStore } from "@/store/useFlashcardStore";
import { uiText } from "@/constants/uiText";
import GoBackButton from "@/components/appComponents/GoBackButton";
import { motion } from "framer-motion";
import clsx from "clsx";
import ThemeToggle from "@/components/appComponents/ThemeToggle";

const navItems = [
  { to: "/study", label: uiText.home.pageRouteTitle },
  { to: "/stats", label: uiText.stats.pageRouteTitle },
  { to: "/generate", label: uiText.generate.pageRouteTitle },
];

const navLinkStyles = {
  base: "relative px-4 py-2 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center h-10 text-sm tracking-wide",
  active: "bg-primary text-white shadow-[0_5px_15px_rgba(85,108,214,0.4)]",
  inactive: "text-text-muted hover:text-primary hover:bg-primary/5",
};

export default function NavigationRouter() {
  const selectedGroupName = useFlashcardStore(
    (state) => state.selectedGroupName,
  );
  if (!selectedGroupName) {
    return null;
  }
  return (
    <nav className="flex items-center justify-between w-full p-4">
      <div className="flex items-center gap-4">
        <GoBackButton />
        {navItems.map(({ to, label }) => {
          const resolvedPath =
            to === "/study" ? `/study/${selectedGroupName}` : to;
          return (
            <NavLink
              key={to}
              to={resolvedPath}
              className={({ isActive }) =>
                clsx(
                  navLinkStyles.base,
                  isActive ? navLinkStyles.active : navLinkStyles.inactive,
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{label}</span>
                  {/* For smooth sliding transition */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-2xl -z-0"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
      <ThemeToggle />
    </nav>
  );
}
