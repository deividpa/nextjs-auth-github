"use client";

import { login } from "@/lib/actions/auth";

export default function Home() {
  return (
    <div>
      <p>You are not Signed In</p>
      <button onClick={login}>Sign In With Github</button>
    </div>
  );
}