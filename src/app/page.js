import { auth, signOut, signIn } from "./auth";

const page = async () => {
  const session = await auth();
  console.log("session=>", session);

  return (
    <div className="my-10 text-center">
      <h1 className="font-semibold text-3xl">
        HELLO NEXT AUTH CRASH COURSE GOOGLE & GITHUB LOGIN.😍
      </h1>
      {session ? (
        <div>
          <h1 className="text-center mt-5 text-2xl">
            You Are Login With This Email:{" "}
            <span className="font-semibold ">{session.user.email}</span>
          </h1>
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
        <div>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button type="submit">Signin with Google</button>
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button type="submit">Signin with Github</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default page;
