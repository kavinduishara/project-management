"use client"
import { useFormStatus } from "react-dom"
import { FaPaperPlane } from "react-icons/fa";


function SendButton() {
    const {pending}=useFormStatus();
  return (
    <button
        type="submit"
        disabled={pending}
        className={`bg-orange-500 text-white font-semibold rounded-xl px-5 py-2 transition-colors ${
            pending ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
        }`}
    >
        {/* {pending ? "Sending..." : "Send"} */}
        <FaPaperPlane className="text-2xl"/>
    </button>

  )
}

export default SendButton