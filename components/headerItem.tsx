"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useActiveSectionContext } from "@/context/active-section-context";

type HeaderItem = {
  name: string;
  hash: string;
  id: string;
};

export default function HeaderItem({ name, hash, id }: HeaderItem) {
  const { activeSection, setActiveSection } = useActiveSectionContext();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.li
      className="h-3/4 flex items-center justify-center relative"
      key={hash}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Link
        className={`
          ${
            id === activeSection ? "text-gray-950 dark:text-gray-200" : ""
          } flex w-full transition-all items-center justify-center px-3 py-3 hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-300`}
        href={""}
        onClick={(e) => {
          e.preventDefault();
          setActiveSection(id);
          scrollToSection(id);
        }}
      >
        {name}

        {id === activeSection && (
          <motion.span
            className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
            layoutId="activeSection"
          ></motion.span>
        )}
      </Link>
    </motion.li>
  );
}
