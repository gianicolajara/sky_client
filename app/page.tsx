"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  router.replace("/home");

  return <div className="text-white">Nothing to see over here</div>;
}
