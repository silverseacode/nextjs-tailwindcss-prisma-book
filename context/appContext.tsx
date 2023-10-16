"use client";
import { UserCustom } from "@/models/user";
import { Connections } from "@prisma/client";
import React, { useState, createContext, useContext } from "react";

type AppContextContextProviderProps = {
  children: React.ReactNode;
};

type ActiveSectionContextType = {
  isNewPost: boolean;
  setNewPost: React.Dispatch<React.SetStateAction<boolean>>;
  chatSelected: Connections | null;
  setChatSelected: React.Dispatch<React.SetStateAction<Connections | null>>;
};

export const ActiveSectionContext =
  createContext<ActiveSectionContextType | null>(null);

export default function AppContextProvider({
  children,
}: AppContextContextProviderProps) {
  const [isNewPost, setNewPost] = useState<boolean>(false);
  const [chatSelected, setChatSelected] = useState<Connections | null>(null)
  return (
    <ActiveSectionContext.Provider
      value={{
        isNewPost,
        setNewPost,
        chatSelected,
        setChatSelected
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "AppContext must be used within an AppContextContextProvider"
    );
  }

  return context;
}