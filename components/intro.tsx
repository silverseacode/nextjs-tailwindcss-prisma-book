"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import useIntersection from "@/utils/useIntersection";
import { useRouter } from "next/navigation";

export default function Intro() {
  const { elementRef} = useIntersection("home");
  const router = useRouter()
  return (
    <section ref={elementRef} id="home" className="mx-auto max-w-6xl  sm:mt-32 sm:mb-[15rem]">
      <div className="flex flex-row justify-between items-center mx-5 mb-5">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-row items-center"
        >
          <Image
            className="w-10 h-10"
            src={"/logo.png"}
            quality={95}
            width={20}
            height={20}
            alt="logo app"
          />
          <span  className="font-bold text-[1rem] sm:text-xl ml-1">
            Lucky Quit
          </span>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => router.push("/signIn")}
          className="bg-white cursor:pointer hover:bg-purple-50 active:bg-purple-50 focus:bg-purple-50 border text-[0.9rem] sm:text-[1rem] border-black  rounded-lg w-[6.3rem] h-[2.1rem] sm:w-[8.1rem] sm:h-[2.5rem]"
        >
          Sign In
        </motion.button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between mx-5 items-start">
        <div className="flex flex-col sm:pr-5 md:pr-10">
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl mt-5 mb:0 sm:text-3xl md:text-5xl"
          >
            Embrace your Lucky Quit
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl mt-3 sm:mt-5 sm:text-2xl md:text-4xl"
          >
            Empowering you to live smoke-free!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-3 sm:mt-5"
          >
            Unlock a healthier future and break free from smoking addiction with
            Lucky Quit – your comprehensive and personalized companion for a
            smoke-free life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex  mt-5 gap-5 flex-col xl:flex-row mx-auto sm:mx-0"
          >
            <Image
              className="cursor-pointer object-contain hover:scale-110 w-[13rem] h-[4rem] "
              src={"/appstore.png"}
              width={300}
              height={300}
              alt="apple store button"
            />

            <Image
              className="cursor-pointer object-contain hover:scale-110  w-[13rem] h-[4rem] "
              src={"/playstore.png"}
              width={300}
              height={300}
              alt="apple store button"
            />
          </motion.div>
        </div>
        <motion.video
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="video-animation relative mx-auto sm:mx-0 flex h-[23rem] w-[27rem] sm:w-[26rem] sm:h-[30rem] lg:w-[39rem] lg:h-[37rem] "
          muted
          autoPlay
          loop
        >
          <source src="/hand-video.mp4" type="video/mp4" />
        </motion.video>
      </div>
    </section>
  );
}
