"use client";
import { ref, uploadBytes } from "firebase/storage";
import { storage, auth } from "@/lib/firebase";

export default function UploadPage() {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !auth.currentUser) return;

    const storageRef = ref(storage, `notes/${auth.currentUser.uid}/${file.name}`);
    await uploadBytes(storageRef, file);

    await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, uid: auth.currentUser.uid }),
    });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Upload File</h1>
      <input type="file" onChange={handleUpload} />
    </main>
  );
}
