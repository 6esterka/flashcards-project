import { motion,AnimatePresence } from "framer-motion"

interface ProgressBarProps {
    readonly progress:number,
    readonly isVisible:boolean
}

export default function ProgressBar({progress,isVisible}:ProgressBarProps){
    return (
        <AnimatePresence>
            {
                isVisible&&(
                    <motion.div
          className="fixed top-0 left-0 w-full h-2 bg-gray-800/50 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="h-full bg-[#0933f0] shadow-[0_0_10px_#e76f51] rounded-r-full"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
          />
        </motion.div>
                )
            }
        </AnimatePresence>
    )
};