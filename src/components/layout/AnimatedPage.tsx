import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

function AnimatedPage({ children }: Readonly<PropsWithChildren>) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="mx-auto w-full max-w-4xl p-4"
    >
      {children}
    </motion.main>
  );
}

export default AnimatedPage;
