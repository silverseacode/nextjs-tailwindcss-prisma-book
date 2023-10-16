"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CardPost from "./cardPost";
import { useAppContext } from "@/context/appContext";
import { useSession } from "next-auth/react";
import { PostCustom } from "@/models/post";
import { BsFilePost } from "react-icons/bs";

const getPosts = async (skip: number, take: number, isProfile: boolean, userId: string | undefined) => {
  const res = fetch(
    `http://localhost:3000/api/posts?skip=${skip}&take=${take}&isProfile=${isProfile}&userId=${userId}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return (await res).json();
};

export default function Posts({
  currentUserId,
  isProfile = false
}: {
  currentUserId: string | undefined;
  isProfile: boolean
}) {
  const [posts, setPosts] = useState<PostCustom[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const batchSize = 10;
  const { isNewPost } = useAppContext();
  const { data: session } = useSession();

  useEffect(() => {
    async function getInitialPosts() {
      setIsLoading(true);
      if(isNewPost) {
        setPosts([])
      }
      const skip = 0;
      const data = await getPosts(skip, 10, isProfile, currentUserId);

      setPosts((prev => {
        if(isNewPost) {
          return [...data.postsSigned, ...prev]
        } else {
          return [...prev, ...data.postsSigned]
        }
      }));
      setTotalPosts(data.totalPosts);
      setIsLoading(false);
    }
    getInitialPosts();
  }, [isNewPost,isProfile, currentUserId]);

  const fetchMoreData = useCallback(async () => {
    if (posts.length < totalPosts) {
      setIsLoading(true);
      const skip = pageNumber * batchSize;
      const data = await getPosts(skip, 10, isProfile, currentUserId);
      setPosts([...posts, ...data.postsSigned]);
      setPageNumber((prev) => prev + 1);
      setIsLoading(false);
    }
  }, [posts, totalPosts, pageNumber, currentUserId, isProfile]);

  const containerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMoreData();
      }
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [fetchMoreData]);

  return (
    <div>
      {posts?.map((item) => (
        <>
          <CardPost
            isDetails={false}
            profilePicUser={session?.user?.image ?? ''}
            currentUserId={currentUserId ?? ''}
            fullNameMySelf={session?.user?.name ?? ''}
            {...item}
          />
        </>
      ))} 
       {posts.length === 0 && !isLoading && ( 
        <div className="flex flex-col h-[10rem] justify-center items-center">
          <BsFilePost className="text-[3rem] mb-5" />
          <span>No Posts</span>
        </div>
     )} 
      {isLoading && (
        <div className="flex flex-col justify-center items-center my-10">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-black"></div>
        </div>
      )}
      <div ref={containerRef}></div>
    </div>
  );
}
