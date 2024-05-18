import Image from "next/image";
import styles from "./Navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data } = useSession();
  console.log(data);
  return (
    <div className={styles.navbar}>
      <h1 className="bigFont">Navbar</h1>
      <div>
        {/* {data?.user?.image ? (
          <img src={data.user.image} alt={data.user.name} />
        ) : (null)} */}
        {data ? data.user?.name : null}
      </div>
      {data ? (
        <button className={styles.button} onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button className={styles.button} onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
}

export default Navbar;
