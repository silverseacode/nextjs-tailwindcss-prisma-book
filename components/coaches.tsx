"use client";
import { coaches } from "@/lib/data";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Coaches } from "@/models/coaches";
import useIntersection from "@/utils/useIntersection";

interface IAnimatedElement {
  item: Coaches;
  index: number;
}

const AnimatedElement = ({ item, index }: IAnimatedElement) => {
  const animation = {
    opacity: 1,
    y: 0,
    transition: {
      delay: index > 0 ? (index === 1 ? 0.2 : 0.4) : 0,
      duration: 0.5,
    },
  }
  const {elementRef, control } = useIntersection("coaches",animation);

  return (
    <>
      <motion.div
        ref={elementRef}
        initial={{ opacity: 0, y: -50 }}
        animate={control}
      >
        <Image
          className="rounded-[1.5rem] border border-gray-150 shadow-sm w-[12.5rem] h-[12.5rem] mt-[3rem] sm:mt-0"
          src={item.imagePath}
          width={200}
          height={200}
          alt={item.alt}
        />
      </motion.div>
      <div className="text-justify sm:text-center text-sm sm:text-xl text-gray-500 leading-[1.8rem] mt-5">
        {item.description}
      </div>
    </>
  );
};

export default function Coaches() {

  return (
    <section  id="coaches" className="mx-auto max-w-6xl sm:mt-[10rem]">
      <h1 className="text-center text-2xl mt-5 sm:mt-0 sm:mb-10 sm:text-3xl">Coaches</h1>
      <div className="flex flex-col sm:flex-row justify-between gap-5">
        {coaches.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center px-5"
          >
            <AnimatedElement item={item} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
