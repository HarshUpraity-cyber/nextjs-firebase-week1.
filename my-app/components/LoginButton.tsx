"use client";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function LoginButton() {
  const { user } = useAuth();

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {user ? (
        <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">
          Logout ({user.displayName})
        </button>
      ) : (
        <button onClick={login} className="px-4 py-2 bg-blue-500 text-white rounded">
          Login with Google
        </button>
      )}
    </div>
  );
}
