import { AnimatePresence, motion } from "framer-motion"
import { uiText } from "@/constants/uiText"
import type { RequestStatus } from "@/types/requestStatus"

interface GenerationStatusProps{
    readonly requestStatus:RequestStatus,
    readonly errorText?:string
}

export default function GenerationStatus({requestStatus,errorText}:GenerationStatusProps){
    return(<AnimatePresence>
        {/* Success message */}
        {requestStatus==="success" && (
          <motion.p
            className="text-center text-green-500 font-medium mt-4"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {uiText.generate.successMessage}
          </motion.p>
        )}
        {/* Error message */}
        {
          requestStatus==="error"&&(
            <motion.p
            className="text-center text-red-500 font-medium mt-4"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {uiText.generate.errorMessage(errorText)}
          </motion.p>
          )
        }
      </AnimatePresence>)
}