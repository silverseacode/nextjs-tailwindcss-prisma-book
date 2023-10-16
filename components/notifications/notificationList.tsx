"use client";
import { Notifications } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NotificationList({
  notifications,
}: {
  notifications: Notifications[];
}) {
  const [notificationsData, setNotificationsData] =
    useState<Notifications[][]>();

  useEffect(() => {
    const groupedNotifications: { [key: string]: Notifications[] } =
      notifications.reduce<{ [key: string]: Notifications[] }>((acc, item) => {
        const key = `${item.postId}_${item.type}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});

    const groupedNotificationsArray = Object.values(groupedNotifications);

    const likes = groupedNotificationsArray.filter(
      (group) => group[0].type === "like"
    );
    const comments = groupedNotificationsArray.filter(
      (group) => group[0].type === "comment"
    );
    const notificationsResult = comments.concat(likes);
    setNotificationsData(notificationsResult);
  }, [notifications]);

  return (
    <>
      {notificationsData?.map((group, index) => {
        const isLike = group[0].type === "like";
        const item = group.filter((_, index) => index < 1).map((item) => item);

        const message =
          group.length > 1
            ? `${item[0].fullName} and ${group.length - 1} other person ${
                isLike ? "likes" : "have commented on"
              } your post.`
            : `${item[0].fullName} ${
                isLike ? "has liked" : "has commented on"
              } your post.`;

        return (
          <Link key={item[0].id} href={`/detail/${item[0].postId}`}>
            <div className="flex flex-row items-center p-4 border-b">
              <Image
                src={item[0].image}
                width={75}
                height={75}
                className="object-cover rounded-full shadow-md h-[4rem] w-[4rem]"
                alt="user profile picture"
              />
              <p className="ml-3">{message}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
