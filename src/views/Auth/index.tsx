import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

const inputStyle = "flex flex-col gap-3 mb-5";

function LoginViews({}: Props) {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsloading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsloading(false);
        push(callbackUrl);
      } else {
        setIsloading(false);
        setError(res.error);
      }
    } catch (error: any) {
      setIsloading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col">
      <h1 className="font-bold text-3xl mb-8">REGISTER</h1>
      {error && <p className="text-red-500 font-bold">{error}</p>}
      <div className="w-1/3 shadow-lg shadow-slate-500 p-6 border border-slate-200 mb-5">
        <form onSubmit={handleLogin}>
          <div className={inputStyle}>
            <label htmlFor="email">Email</label>
            <input
              className="h-10 bg-slate-300 p-4 rounded-md"
              type="email"
              id="email"
              placeholder="Input Email"
            />
          </div>
          <div className={inputStyle}>
            <label htmlFor="password">Password</label>
            <input
              className="h-10 bg-slate-300 p-4 rounded-md"
              type="password"
              id="password"
              placeholder="Input Password"
            />
          </div>
          <button
            className="text-center bg-black text-white w-full p-2 mt-5 rounded-md"
            disabled={isLoading ? true : false}
          >
            {isLoading ? "...LOADING" : "REGISTER"}
          </button>
        </form>
        <button
          className="text-center text-white w-full p-2 bg-red-400 mt-5 rounded-md"
          onClick={() => 
            signIn("google", {
              callbackUrl,
              redirect: false
            })
          }
        >
          Sign In With Google
        </button>
      </div>
      <p>
        Don&apos;t have account ?{" "}
        <Link href="/auth/register" className="text-cyan-500 font-bold">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginViews;
