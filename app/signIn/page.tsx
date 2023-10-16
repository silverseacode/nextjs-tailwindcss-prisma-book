"use client";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/appContext";
import { useLocalStorage } from "@/context/storageContext";

const postUser = async ({
  fullName,
  email,
  image,
}: {
  fullName: string;
  email: string;
  image: string;
}) => {
  const res = fetch("http://localhost:3000/api/user", {
    method: "POST",
    body: JSON.stringify({ fullName, email, image }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();
  const {setStoredData} = useLocalStorage()

  useEffect(() => {
    async function saveUser() {
      if (session && session.user) {
        const data = await postUser({
          fullName: session.user.name ?? "",
          email: session.user.email ?? "",
          image: session.user.image ?? "",
        });
        setStoredData(data.user.id);
        router.push("/home");
      }
    }

    saveUser();
  }, [session, router, setStoredData]);

  return (
    <div className="bg-purple-50">
      <div className="flex flex-col max-w-2xl mx-auto justify-center items-center h-screen ">
        <h1 className="text-2xl sm:text-4xl mb-5 ">Lucky Quit</h1>
        <h2 className="text-xl sm:text-md mb-5 text-purple-500">
          Stop Smoking Now!
        </h2>
        <button
          className="flex space-x-6 justify-center items-center w-[20rem] h-[3.5rem] rounded-full shadow-lg  bg-white"
          onClick={() => signIn("google", { redirect: false })}
        >
          <Image
            src="/googleIcon.png"
            width={20}
            height={20}
            alt="google sign in icon"
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
