"use client";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

async function fetchUsers(searchTerm: string) {
  const res = await fetch(
    `http://localhost:3000/api/search?term=${searchTerm}`,
    {
      next: { revalidate: 0 },
    }
  );
  const data: { users: User[] } = await res.json();
  return data.users;
}

export default function Search() {
  const [value, setValue] = useState("");
  const [users, setSearchResults] = useState<User[]>();

  const handleSearch = async () => {
    const result = await fetchUsers(value);
    setSearchResults(result);
  };

  return (
    <>
      <div className="flex flex-row items-center">
        <input
          placeholder="Search by Name"
          className="bg-gray-50 w-full p-3 rounded-full"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="bg-black text-white text-3xl rounded-lg p-1 ml-2">
          <AiOutlineSearch className="cursor-pointer" onClick={handleSearch} />
        </div>
      </div>
      {users && users.length > 0 && (
        <div className="p-2">
          {users?.map((item) => (
            <Link key={item.id} href={`/profile/${item.id}`}>
              <div className="flex flex-row items-center mt-3">
                <Image
                  src={item.image}
                  width={75}
                  height={75}
                  className="object-cover rounded-full shadow-md h-[3rem] w-[3rem]"
                  alt="user profile picture"
                />
                <span className="ml-3">{item.fullName}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
