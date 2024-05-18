import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {};

const inputStyle = "flex flex-col gap-3 mb-5";

const RegisterPage = (props: Props) => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: any) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      name: event.target.name.value,
      password: event.target.password.value,
    }
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // console.log(result);
    if (result.status === 200) {
      event.target.reset();
      setIsloading(true);
      router.push("/auth/login");
    } else {
      setIsloading(false);
      setError(result.status === 400 ? "Email Already Exist" : "");
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col">
      <h1 className="font-bold text-3xl mb-8">REGISTER</h1>
      {error && <p className="text-red-500 font-bold">{error}</p>}
      
      <form onSubmit={handleLogin} className="w-1/3 shadow-lg shadow-slate-500 p-6 border border-slate-200 mb-5">
        <div className={inputStyle}>
          <label htmlFor="email">Email</label>
          <input  className="h-10 bg-slate-300 p-4 rounded-md" type="email" id="email" placeholder="Input Email"/>
        </div>
        <div className={inputStyle}>
          <label htmlFor="email">Name</label>
          <input  className="h-10 bg-slate-300 p-4 rounded-md" type="text" id="name" placeholder="Input Name"/>
        </div>
        <div className={inputStyle}>
          <label htmlFor="email">Password</label>
          <input  className="h-10 bg-slate-300 p-4 rounded-md" type="password" id="password" placeholder="Input Password"/>
        </div>
        <button className="text-center bg-black text-white w-full p-2" disabled={isLoading ? true : false}>
          {isLoading ? "...LOADING" : "REGISTER"}
        </button>
      </form>
      <p>Already have account ? Sign In <Link href="/auth/login" className="text-cyan-500 font-bold">Here</Link></p>
    </div>
  );
};

export default RegisterPage;
