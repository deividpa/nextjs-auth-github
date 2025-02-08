"use server";

import { auth } from "@/auth";
import { SignInButton } from "./components/sign-in-button";
import Image from "next/image";

export default async function Home() {

  const session = await auth();
  console.log(session)

  if(session?.user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          NextAuth v5 project using NextJS
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          You are signed in as {session.user.email}
        </p>
        { session.user.image &&
          <Image 
            src={session.user.image || "/default-image.png"}
            alt={session.user.name || "User Image"}
            width={100}
            height={100}
            className="rounded-full"
          />
        }
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <p className="text-xl text-gray-700 mb-6">You are not Signed In</p>
      <SignInButton />
    </div>
  );
}