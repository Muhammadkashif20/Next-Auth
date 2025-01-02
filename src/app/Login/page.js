import { auth, signIn, signOut } from "@/app/auth";
import Image from "next/image";
import React from "react";

const Login = async () => {
  const session = await auth();
  console.log("session=>", session);

  return (
    <div className="container my-36 flex justify-center items-center">
      {session ? (
        <div className="bg-white outline outline-gray-200 w-1/3 h-1/2 flex flex-col items-center justify-center py-4">
          <Image className="rounded-full p-4 " width={150} height={100} src={session?.user?.image}/>
          <h1 className="font-semibold text-2xl">{session?.user?.name}</h1>
          <h2 className="font-normal ">{session?.user?.email}</h2>
          <form
          action={async () => {
            "use server";
            await signOut("google");
          }}
        >
          <button type="submit">SignOut</button>
        </form>
        </div>
        
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
      )}
    </div>
  );
};

export default Login;
