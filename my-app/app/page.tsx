"use client";
import LoginButton from "@/components/LoginButton";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <LoginButton />
      {user && (
        <div className="flex gap-4">
          <Link href="/upload" className="px-4 py-2 bg-green-500 text-white rounded">
            Upload Page
          </Link>
          <Link href="/chat" className="px-4 py-2 bg-purple-500 text-white rounded">
            Chat Page
          </Link>
        </div>
      )}
    </main>
  );
}
