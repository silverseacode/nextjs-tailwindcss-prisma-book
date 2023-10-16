"use client";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { BsChevronUp } from "react-icons/bs";
import { faq } from "@/lib/data";
import useIntersection from "@/utils/useIntersection";

export default function Faq() {
  const { elementRef} = useIntersection("faq");
  return (
    <section ref={elementRef} id="faq" className="mx-auto max-w-2xl sm:my-[15rem]">
      <h1 className="text-center text-2xl mt-5 sm:mt-0 sm:text-3xl pt-5">
        FAQ
      </h1>
      <div className="w-full px-4 pt-5">
        <div className="mx-auto w-full rounded-2xl bg-white p-2">
          {faq.map((item) => (
            <Disclosure key={item.id}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full mb-2 justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-black-500 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <h3 className="sm:text-xl">{item.question}</h3>
                    <BsChevronUp
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500 transition-all`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm sm:text-lg text-gray-500">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
