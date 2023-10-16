"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { menuItems } from "@/lib/data";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useLocalStorage } from "@/context/storageContext";
import { Notifications } from "@prisma/client";

async function fetchInvitations(userId: string | null) {
  const res = await fetch(
    `http://localhost:3000/api/invitations?to=${userId}`,
    { cache: "no-store" }
  );
  const data: { invitations: Request[] } = await res.json();
  return data.invitations;
}

async function fetchNotifications(userId: string | null) {
  const res = await fetch(
    `http://localhost:3000/api/notifications?userId=${userId}`,
    {
      cache: "no-store",
    }
  );
  const data: { notifications: Notifications[] } = await res.json();
  return data.notifications;
}

export default function Header() {
  const pathname = usePathname();
  let routeName = pathname?.slice(1);
  const router = useRouter();
  const { storedData } = useLocalStorage();

  const [badgeInvitations, setBadgeInvitations] = useState(0);
  const [badgeNotifications, setBadgeNotifications] = useState(0);


  const handleNavigation = (title: string) => {
    if (title === "logout") {
      router.push(`/`);
      return;
    }
    if (title === "you") {
      router.push(`/profile/${storedData}`);
      return;
    }
    router.push(`/${title}`);
  };

  useEffect(() => {
    async function getPendingNumberOfInvitations() {
      const invitations = await fetchInvitations(storedData);
      setBadgeInvitations(invitations.length);
    }

    async function getUnReadNumberOfNotifications() {
      const notifications = await fetchNotifications(storedData);
      const notificationsUnRead = notifications.filter((item) => item.status === "unread")
      setBadgeNotifications(notificationsUnRead.length);
    }

    getPendingNumberOfInvitations();
    getUnReadNumberOfNotifications();
  }, [storedData, routeName]);

  if (routeName === "" || routeName === "signIn") {
    return null;
  }

  return (
    <div className="bg-white mb-10 h-[6rem] sm:h-[3.75rem]">
      <div className="max-w-6xl mx-auto flex h-full flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-row items-center w-full pt-3 sm:pt-0 justify-center sm:justify-start">
          <Image
            className="w-10 h-10"
            src={"/logo.png"}
            quality={95}
            width={20}
            height={20}
            alt="logo app"
          />
          <span className="font-bold text-[1rem] sm:text-xl ml-1">
            Lucky Quit
          </span>
        </div>
        <nav className="flex flex-row w-full">
          <ul className="flex flex-row  w-full justify-around sm:justify-end">
            {menuItems.map((item) => {
              if (routeName?.includes("profile/")) {
                routeName = "you";
              }
              return (
                <React.Fragment key={item.title}>
                  <li
                    onClick={() => handleNavigation(item.title.toLowerCase())}
                    className="text-gray-600 flex sm:ml-10 flex-col items-center  sm:justify-center cursor-pointer "
                  >
                    <span
                      className={`${
                        routeName === item.title.toLowerCase() &&
                        item.title !== "Logout"
                          ? " text-[#A333FF]"
                          : ""
                      }  text-[1.5rem] sm:text-[2rem] mb-1 relative`}
                    >
                      {item.icon}
                      {item.title.toLowerCase() === "network" &&
                        badgeInvitations > 0 && (
                          <span className="bg-red-500 top-5 left-5 rounded-full w-[1.4rem] h-[1.4rem] absolute text-white text-sm flex flex-col justify-center items-center">
                            {badgeInvitations}
                          </span>
                        )}
                        {item.title.toLowerCase() === "notifications" &&
                        badgeNotifications > 0 && (
                          <span className="bg-red-500 top-5 left-5 rounded-full w-[1.4rem] h-[1.4rem] absolute text-white text-sm flex flex-col justify-center items-center">
                            {badgeNotifications}
                          </span>
                        )}
                    </span>
                    <span
                      className={`${
                        routeName === item.title.toLowerCase() &&
                        item.title !== "Logout"
                          ? "border-b-[2px] border  border-[#A333FF] opacity-70"
                          : ""
                      }  translate-y-0 sm:translate-y-2 w-full`}
                    ></span>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
