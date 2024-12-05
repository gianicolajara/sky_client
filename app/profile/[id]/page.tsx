"use client";

import Profile from "@/components/profile";
import AuthContextProvider from "@/contexts/Auth";
import { useParams } from "next/navigation";

const ProfilePageById = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <AuthContextProvider>
      <Profile id={id} />
    </AuthContextProvider>
  );
};

export default ProfilePageById;
