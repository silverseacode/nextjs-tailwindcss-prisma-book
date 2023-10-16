"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/appContext";

export default function CreatePost() {
  const {setNewPost} = useAppContext()
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File>();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false)
  const handleCreatePost = async () => {
    setIsLoading(true)
    let pictureUrl = "";
    if (file) {
      const data = new FormData();
      data.set("file", file);
      // @ts-ignore
      const fileType = encodeURIComponent(file.type);
      const res = await fetch(
        `http://localhost:3000/api/media?fileType=${fileType}`,
        {
          method: "POST",
          body: data,
        }
      );
      const user = await res.json();
      pictureUrl = user.url;
    }
    await fetch("http://localhost:3000/api/post", {
      method: "POST",
      body: JSON.stringify({
        description: text,
        pictureUrl,
        profilePic: session?.user?.image,
        fullName: session?.user?.name
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setNewPost(true)
    setIsLoading(false)
    setIsOpen(false)
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-gray-100 p-4 cursor-pointer hover:opacity-80 hover:scale-95"
      >
        <span className="text-gray-600">What&apos;s in your mind?</span>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <div className="text-2xl p-4 text-center font-medium leading-6 text-gray-900 justify-between flex bg-[#A333FF]">
                    <span></span>
                    <button
                      onClick={handleCreatePost}
                      className="text-white text-[1rem]"
                    >
                      {isLoading ? <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div> : "Publish"}
                    </button>
                  </div>
                  <div className="mt-2 py-4 flex flex-row items-center space-x-4 border-b-2 mx-4">
                    <Image
                      src={session?.user?.image!}
                      width={75}
                      height={75}
                      className="object-cover rounded-full shadow-md h-[4rem] w-[4rem]"
                      alt="user profile picture"
                    />
                    <span>{session?.user?.name}</span>
                  </div>
                  <div className="p-2">
                    <textarea
                      placeholder="What's in your mind?"
                      maxLength={2000}
                      onChange={(e) => setText(e.target.value)}
                      rows={7}
                      className="resize-none appearance-none rounded border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <div className="flex flex-row justify-between my-5">
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        id="file"
                        accept="image/jpeg,image/png"
                      />
                      <div>
                        <span className="font-bold">{text.length}/2000</span>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
