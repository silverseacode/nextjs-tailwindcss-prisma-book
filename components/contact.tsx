"use client";
import useIntersection from "@/utils/useIntersection";
import { motion } from "framer-motion";
import { sendEmail } from "@/actions/sendEmail";
import SubmitButton from "./submitButton";
import toast from "react-hot-toast";

export default function Contact() {
  const { elementRef } = useIntersection("contact");
  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
      ref={elementRef}
      id="contact"
      className="flex  mx-auto flex-col md:flex-rox px-6 mt-5 max-w-2xl"
    >
      <h1 className="text-center text-2xl sm:text-3xl">Contact</h1>
      <div className=" mt-8 p-2 md:p-0">
        <form
          action={async (formData) => {
            const { error } = await sendEmail(formData);

            if (error) {
              
              toast.error(error);
              return;
            }

            toast.success("Email sent successfully!");
          }}
          className="bg-white shadow-md px-4 md:px-8 py-4 md:py-8 mb-4 rounded-2xl"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              maxLength={320}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              maxLength={2000}
              rows={7}
              className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-start">
            <SubmitButton />
          </div>
        </form>
      </div>
    </motion.section>
  );
}
