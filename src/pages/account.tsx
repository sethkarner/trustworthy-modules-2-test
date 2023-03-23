import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Button, ButtonVariant } from "../components/Button/Button";
import { api } from "../utils/api";
import UserList from "../components/UserList";

const Account = () => {
  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";
  let currentUser;
  if (isAuthed) {
    currentUser = api.user.getCurrentUser.useQuery({
      email: session?.user?.email,
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-top">
      {isAuthed ? (
          <div className="text-5xl font-bold">
            {/* if no name for the user then we use username instead. */}
            {currentUser?.data?.name ? currentUser?.data?.name : currentUser?.data?.username}
          </div>
        ) : <div className="flex flex-col justify-center items-center">
          <div className="text-5xl font-bold p-2">Account</div>
          <span className="text-2xl pt-4 my-4">Please Sign In to Continue</span>
        </div>
        }
      <div className="flex flex-row justify-around items-center w-11/12 p-2 my-8">
        {isAuthed ? <p>{currentUser?.data?.role}</p> : null}
        {isAuthed ? <p>{currentUser?.data?.email}</p> : null}
        <Button
          variant={ButtonVariant.Primary}
          onClick={() => {
            isAuthed ? void signOut() : void signIn();
          }}
        >
          {isAuthed ? "Sign out" : "Sign in"}
        </Button>
      </div>
      
      <UserList />
    </div>
  );
};

export default Account;
