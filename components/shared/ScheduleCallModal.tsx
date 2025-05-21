import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState, FC, useEffect } from "react";
import { event } from "../../lib/ga";
import { corporateConversationImg } from "@/asserts/img";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  message: string | null;
}

const ScheduleCallModal: FC<Props> = ({ isOpen, onClose, message }) => {
  function handleClick() {
    // @ts-ignore
    window.Calendly.initPopupWidget({
      // url: "https://calendly.com/sales-markethub-zm/30min",
      url: "https://calendly.com/sales-markethub-zm/30-minute-consultation",
    });
    onClose();
    return false;
  }

  const [isVisible, setIsVisible] = useState(false);
  let inactivityTimer: NodeJS.Timeout;

  // Function to reset the timer
  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // 30 seconds
  };

  useEffect(() => {
    resetTimer(); // Start the timer initially

    // Reset timer on user interaction
    const handleUserActivity = () => {
      if (isVisible) {
        setIsVisible(false);
        resetTimer();
      }
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity);

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
    };
  }, []);

  function handleClose() {
    if (isOpen) {
      onClose();
    } else {
      setIsVisible(false);
    }
  }

  return (
    <Dialog open={isOpen || isVisible} onOpenChange={handleClose}>
      <DialogContent className="bg-white border-none">
        <div className="relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg">
          <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
            <Image
              src={corporateConversationImg}
              alt="card-image"
              className="h-full w-full rounded-md md:rounded-lg object-cover"
            />
          </div>
          <div className="p-6">
            <motion.button
              onClick={() => {
                handleClick();
                if (message) {
                  event({
                    action: message,
                    params: {
                      item: message,
                    },
                  });
                }
              }}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.1, rotate: [0, 2, -2, 2, 0] }}
              whileTap={{ scale: 0.9 }}
              className=" bg-primary hover:bg-[#db3a37] text-white py-2 px-4 text-lg font-bold rounded-full shadow-lg"
            >
              📅 Schedule A Call
            </motion.button>

            <h4 className="my-4 text-slate-800 text-xl font-semibold">
              Stay front of mind – Schedule a Free Zoom Consultation Today
            </h4>
            <p className="mb-4 text-slate-600 leading-normal font-light">
              schedule a free consultation today to create a client building
              strategy
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ScheduleCallModal;
