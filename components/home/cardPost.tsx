"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Comments, Likes, Notifications } from "@prisma/client";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { PostCustom } from "@/models/post";
import { useRouter } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";
import { FaCommentSlash } from "react-icons/fa";
import Link from "next/link";

const likePost = async ({ profilePic, postId, fullName, userId }: Likes) => {
  const res = fetch(`http://localhost:3000/api/like`, {
    method: "POST",
    body: JSON.stringify({
      profilePic,
      postId,
      fullName,
      userId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const addNotification = async ({
  from,
  fullName,
  image,
  postId,
  to,
  type,
}: Notifications) => {
  const res = fetch(`http://localhost:3000/api/notification`, {
    method: "POST",
    body: JSON.stringify({
      from,
      fullName,
      image,
      postId,
      to,
      type,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const unLikePost = async (userId: string | undefined, postId: string) => {
  const res = fetch(
    `http://localhost:3000/api/like?userId=${userId}&postId=${postId}`,
    {
      method: "DELETE",
    }
  );
  return (await res).json();
};

const addComment = async ({
  profilePic,
  postId,
  fullName,
  userId,
  description,
}: Comments) => {
  const res = fetch(`http://localhost:3000/api/comment`, {
    method: "POST",
    body: JSON.stringify({
      profilePic,
      postId,
      fullName,
      userId,
      description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

export default function CardPost({
  pictureUrl,
  createdAt,
  profilePic,
  id,
  fullName,
  currentUserId,
  likes,
  comments,
  description,
  profilePicUser,
  isDetails = false,
  userId,
  fullNameMySelf
}: PostCustom & {
  currentUserId: string;
  profilePicUser: string;
  isDetails: boolean;
  fullNameMySelf: string
}) {
  const [likesData, setLikesData] = useState(likes);
  const [commentsData, setCommentsData] = useState(comments);
  const [isLiked, setIsLiked] = useState(false);
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("en-US");
  const router = useRouter();
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    likesData?.map((like) => {
      if (like.userId === currentUserId) {
        setIsLiked(true);
      }
    });
  }, [currentUserId, likesData]);

  const handleLike = async (isLiked: boolean) => {
    setIsLiked((prev) => !prev);
    if (isLiked) {
      const updatedItems = likesData?.filter(
        (like) => like.userId !== currentUserId
      );
      setLikesData(updatedItems);
      await unLikePost(currentUserId, id);
    } else {
      const like = {
        id: "",
        profilePic: profilePicUser ?? "",
        postId: id,
        fullName: fullNameMySelf,
        userId: currentUserId ?? "",
      };
      const updatedItems = [...likesData, like];
      setLikesData(updatedItems);
      await likePost(like);
      const notification = {
        id: "",
        from: currentUserId ?? "",
        to: userId,
        fullName: fullNameMySelf,
        image: profilePicUser ?? "",
        postId: id,
        type: "like",
        status: "unread"
      };
  
      await addNotification(notification);
    }
  };

  const handleAddComment = async () => {
    const temporaryId = Math.floor(Math.random() * 100);
    const comment = {
      id: String(temporaryId),
      profilePic: profilePicUser ?? "",
      postId: id,
      fullName: fullNameMySelf,
      userId: currentUserId ?? "",
      description: commentInput,
      createdAt: new Date(),
    };
    const updatedItems = [...commentsData, comment];
    setCommentsData(updatedItems);
    await addComment(comment);
    const notification = {
      id: "",
      from: currentUserId ?? "",
      to: userId,
      fullName: fullNameMySelf,
      image: profilePicUser ?? "",
      postId: id,
      type: "comment",
      status: "unread"
    };

    await addNotification(notification);
  };

  return (
    <div className="flex flex-col mb-12">
      <Link href={`/profile/${userId}`}>
        <div className="flex flex-row">
          <Image
            src={profilePic}
            width={75}
            height={75}
            className="object-cover rounded-full shadow-md h-[4rem] w-[4rem]"
            alt="user profile picture"
          />
          <div className="flex flex-col justify-center pl-5">
            <span>{fullName}</span>
            <span className="text-gray-500">{formattedDate}</span>
          </div>
        </div>
      </Link>

      <div className="my-5">
        <div className="relative">
          <Image
            src={pictureUrl}
            width={600}
            height={600}
            quality={95}
            className="object-cover h-[25rem] w-full rounded-[1rem]"
            alt="user profile picture"
          />
          <div
            onClick={() => handleLike(isLiked)}
            className="cursor-pointer absolute bottom-5 left-5 bg-red-600 rounded-full h-[3rem] w-[3rem] text-white justify-center items-center flex"
          >
            {isLiked ? (
              <AiFillHeart className="text-white text-[1.8rem] opacity-80" />
            ) : (
              <AiOutlineHeart className="text-white text-[1.8rem]" />
            )}
          </div>
          {likesData?.length > 0 && (
            <div className="bg-white absolute left-[5rem] bottom-8 text-center opacity-80 rounded-full h-[1.5rem] w-[3rem]">
              {likesData.length}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className=" flex flex-row -space-x-2">
          {likesData
            ?.filter((item, index) => index < 3)
            .map((like, index) => (
              <React.Fragment key={index}>
                <Image
                  src={like.profilePic}
                  width={75}
                  height={75}
                  quality={95}
                  className="object-cover h-[2rem] w-[2rem] rounded-[5rem] shadow-lg"
                  alt="user profile picture"
                />
              </React.Fragment>
            ))}
        </div>

        {likesData?.length > 0 && (
          <div className="ml-5">
            <span className="font-bold mr-2">Liked by</span>
            {isLiked ? (
              <span>You</span>
            ) : (
              <span>{likesData?.[0]?.fullName}</span>
            )}
            {likesData.length > 1 && (
              <span> and {likesData.length - 1} others</span>
            )}
          </div>
        )}
      </div>
      <div>
        <p className="text-justify text-[1rem]">{description}</p>
      </div>
      {!isDetails ? (
        <>
          {commentsData.length > 0 && (
            <div className="flex flex-row my-3">
              <span>{commentsData[0].description}</span>
            </div>
          )}
          <div>
            <span
              onClick={() => router.push(`/detail/${id}`)}
              className="text-gray-500 cursor-pointer"
            >
              Add a comment
            </span>
          </div>
        </>
      ) : (
        <div className="relative min-h-[20rem] mt-[1rem]">
          <div className="bg-gray-50 flex flex-col p-2 rounded-lg overflow-y-auto h-[20rem] pb-20 pt-5">
            {commentsData?.map((item) => {
              const date = new Date(item.createdAt);
              const formattedDate = date.toLocaleDateString("en-US");
              return (
                <div
                  key={item.id}
                  className="flex flex-row space-x-4 pb-5 border-b"
                >
                  <Link href={`/profile/${item.userId}`}>
                    <Image
                      src={item.profilePic}
                      width={75}
                      height={75}
                      quality={95}
                      className="object-cover h-[3rem] w-[3rem] rounded-[5rem] shadow-lg"
                      alt="user profile picture"
                    />
                  </Link>
                  <div className="flex flex-col ">
                    <span className="font-bold">{item.fullName}</span>
                    <span className="text-gray-400 text-sm">
                      {formattedDate}
                    </span>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
            {commentsData.length === 0 && (
              <div className="flex flex-col justify-center items-center h-full text-gray-700">
                <FaCommentSlash className="text-[3rem] mb-5" />
                <p>No comments</p>
              </div>
            )}
          </div>
          <div className=" flex flex-row  absolute bottom-0 w-full bg-white py-5 shadow items-center">
            <Image
              src={profilePicUser ?? ""}
              width={75}
              height={75}
              quality={95}
              className="object-cover h-[3rem] w-[3rem] rounded-[5rem] shadow-lg mr-5 ml-3"
              alt="user profile picture"
            />
            <input
              type="text"
              className="border border-gray-400 rounded-full w-full mr-5 pl-3 h-[2.9rem]"
              value={commentInput}
              placeholder="Enter your comment..."
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <FaPaperPlane
              onClick={handleAddComment}
              className="text-[1.5rem] text-purple-600 mr-5 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
