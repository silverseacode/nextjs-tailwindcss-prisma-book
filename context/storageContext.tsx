"use client"
import { createContext, useContext, useState, useEffect } from 'react';

type StorageContextType = {
  storedData: string | null;
  setStoredData: React.Dispatch<React.SetStateAction<string | null>>;
};

const LocalStorageContext = createContext<StorageContextType | null>(null);

type StorageContextProviderProps = {
  children: React.ReactNode;
};

export function LocalStorageProvider({ children }: StorageContextProviderProps) {
  const [storedData, setStoredData] = useState<string | null>(() => {
    const data = localStorage.getItem('userId');
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    localStorage.setItem('userId', JSON.stringify(storedData));
  }, [storedData]);

  return (
    <LocalStorageContext.Provider value={{ storedData, setStoredData }}>
      {children}
    </LocalStorageContext.Provider>
  );
}

export function useLocalStorage() {
  const context = useContext(LocalStorageContext);
  if (context === null) {
    throw new Error('useLocalStorage must be used within a LocalStorageProvider');
  }
  return context;
}
