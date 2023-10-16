import NotificationList from "@/components/notifications/notificationList";
import { Notifications } from "@prisma/client";
import { cookies } from "next/headers";
import React from "react";
import { IoIosNotifications } from "react-icons/io";

async function fetchNotifications(userId: string | undefined) {
  const res = await fetch(
    `http://localhost:3000/api/notifications?userId=${userId}`,
    {
      cache: "no-store",
    }
  );
  const data: { notifications: Notifications[] } = await res.json();
  return data.notifications;
}

async function markAllAsRead(notifications: Notifications[]) {
  const res = await fetch(`http://localhost:3000/api/notifications`, {
    method: "PUT",
    cache: "no-store",
    body: JSON.stringify({
      notifications,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
}

export default async function Notifications() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("userId");
  const notifications = await fetchNotifications(cookie?.value);
  if (notifications.length > 0) {
    await markAllAsRead(notifications);
  }

  return (
    <div className="flex flex-col max-w-xl mx-auto h-screen bg-white">
      {notifications.length > 0 ? (
        <NotificationList notifications={notifications} />
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <IoIosNotifications className="text-[4rem]" />
          <p className="text-2xl">No notifications</p>
        </div>
      )}
    </div>
  );
}
