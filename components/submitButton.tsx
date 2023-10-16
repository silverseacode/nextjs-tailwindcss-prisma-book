import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`group focus:scale-110 active:scale-110 hover:scale-110 flex rounded-full justify-center bg-gray-900 hover:bg-gray-950 gap-2 items-center flex-row transition-all  text-white font-bold focus:outline-none focus:shadow-outline w-[7.1rem] h-[2.6rem]`}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane className="text-xs group-hover:translate-x-1 group-hover:-translate-y-1" />
        </>
      )}
    </button>
  );
}
