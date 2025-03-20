"use client"

import { X } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"; // Import framer-motion

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onAddAnother: () => void
  message?: string
}

export default function SuccessModal({
  isOpen,
  onClose,
  onAddAnother,
  message = "New user added successfully",
}: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence> {/* Wrap with AnimatePresence */}
      {isOpen && (
        <motion.div      
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" // Backdrop styles
        >
          <motion.div    
            initial={{ opacity: 0, scale: 0.5, rotateY: 40 }} // Example content animation - adjust as desired
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative" // Modal content styles
          >
            <button onClick={onClose} className="absolute right-4 top-4">
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <div className="flex flex-col items-center pt-6">
              <h2 className="text-[#8a2be2] text-xl font-medium mb-2">Congratulations</h2>

              <div className="my-2">
                <span role="img" aria-label="celebration" className="text-3xl">
                  🎉
                </span>
              </div>

              <p className="text-gray-700 mb-6">{message}</p>

              <div className="rounded-full bg-white border-2 border-[#00d455] w-16 h-16 flex items-center justify-center mb-8">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12L10 17L19 8"
                    stroke="#00d455"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="w-full space-y-3">
                <Button onClick={onAddAnother} className="w-full bg-[#8a2be2] hover:bg-[#8a2be2]/90">
                  Add another user
                </Button>

                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full border-[#8a2be2] text-[#8a2be2] hover:bg-[#8a2be2]/10"
                >
                  Done
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}