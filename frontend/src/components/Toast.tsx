import { useEffect } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { SiTicktick } from "react-icons/si";
type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
}

const Toast = ({ message, type,onClose }: ToastProps) => {
    
    useEffect(() => { 
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    },[onClose])

    const styles = type === "SUCCESS"
        ? "fixed top-4 right-4 z-50 py-3 px-2 rounded-sm bg-[#F7FFE5] text-[#1A5D1A] " 
        : "fixed top-4 right-4 z-50 py-3 px-2 rounded-sm bg-[#FFF2F2] text-[#FC2947]  "
    
    return (
        <div className={styles}>
            <div className="flex justify-start items-center ml-3">
                <span className="font-semibold flex flex-row justify-start items-center gap-2 w-[300px]">
                    {type === "SUCCESS"
                        ? <SiTicktick />
                        : <FiAlertCircle />
                     }
                    <span className="text-md">
                    {message}
                    </span>
                </span>
            </div>
        </div>
    )
}

export default Toast;