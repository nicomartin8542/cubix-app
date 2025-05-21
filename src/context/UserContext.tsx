// src/contexts/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { Identity } from "@/types";

interface UserContextType {
  user: Identity | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

export const UserProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data: user, isLoading } = useGetIdentity<Identity>();

  return (
    <UserContext.Provider value={{ user: user || null, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
