import { auth, signIn } from "@/app/auth";
import React from "react";

const Login = async () => {
  const session = await auth();
  console.log("session=>",session);
  
  return (
    <div className="container mx-auto flex justify-center items-center">
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </div>
  );
};

export default Login;
