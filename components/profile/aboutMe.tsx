"use client";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";

const updateAboutMe = async ({ text, userId }: {text: string, userId: string}) => {
  const res = fetch(`http://localhost:3000/api/user/aboutMe`, {
    method: "PUT",
    body: JSON.stringify({
      text,
      userId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

export default function AboutMe({ isYou, user, userId }: { isYou: boolean, user: User, userId: string }) {
  const [text, setText] = useState(user.aboutMe ?? '');
  const [isEditing, setEdit] = useState(false);

  const handleSaveAboutMe = async () => {
    const data = {
      text,
      userId
    }
    await updateAboutMe(data)
    setEdit(false)
  };

  return (
    <div>
      <div className="flex flex-row justify-between px-1 pt-3">
        <h4 className="text-xl">About me</h4>
        {isYou && <>
        {isEditing ? (
          <span className="cursor-pointer" onClick={handleSaveAboutMe}>Done</span>
        ) : (
          <BsFillPencilFill className="cursor-pointer" onClick={() => setEdit(true)} />
        )}
        </>}
      </div>
      {!isYou ? (
        <p className="bg-gray-100 text-gray-500 p-4 mt-3">{user?.aboutMe ?? "No description"}</p>
      ) : (
        <textarea
        disabled={!isEditing}
          placeholder="Tell us about yourself. Share your interests, hobbies, and a little bit about your background. Be creative and let others get to know you!"
          maxLength={2000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          className="resize-none appearance-none rounded-lg bg-gray-100 p-4 w-full mt-5 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
    </div>
  );
}
