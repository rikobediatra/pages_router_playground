import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

function Profile({}: Props) {
  const { data } = useSession();

  return (
    <div>
      {data ? (
        <>
          <div>{data?.user?.email}</div>
          <div>{data?.user?.name}</div>
        </>
      ) : (
        <div>Profile</div>
      )}
    </div>
  );
}

export default Profile;
