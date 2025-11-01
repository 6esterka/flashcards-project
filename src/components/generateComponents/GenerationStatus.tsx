import { AnimatePresence, motion } from "framer-motion"
import { uiText } from "@/constants/uiText"

interface GenerationStatus{
    readonly showSuccess:boolean
}

export default function GenerationStatus({showSuccess}:GenerationStatus){
    return(<AnimatePresence>
        {showSuccess && (
          <motion.p
            className="text-center text-green-500 font-medium mt-4"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {uiText.generate.success}
          </motion.p>
        )}
      </AnimatePresence>)
}