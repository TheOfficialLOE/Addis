import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { io } from "socket.io-client";

const Index = () => {
  const router = useRouter();
  const token = getCookie("token");

  useEffect(() => {
    if (!token)
      router.push("/registration");
  }, [router, token]);

  const socket = io("http://localhost:3001", {
    auth: {
      token
    }
  });

  return <div className="h-screen">
    <div className="grid grid-cols-[min-content_auto] grid-flow-dense h-full">
      <ul className="w-96 bg-neutral p-4">
        <li className="btn justify-start w-full h-20">
          <div className="w-12 h-12 avatar justify-center items-center rounded-xl bg-accent">
            <p className="text-accent-content font-bold">J</p>
          </div>
          <div className="ml-4 flex flex-col items-start">
            <p className="text-white font-bold">Jason</p>
            <p className="text-sm mt-2">Jason: What up buddy?</p>
          </div>
          <div className="flex flex-col items-end items-end grow">
            <p>8:52 PM</p>
            <div className="badge badge-primary mt-2">1500</div>
          </div>
        </li>
      </ul>
      <div className="flex flex-col mx-8 mb-8">
        <ul className="grow">
          <li className="mt-4">
            <p className="inline-block bg-secondary text-secondary-content p-4 rounded-xl">What up buddy?</p>
          </li>
          <li className="mt-4 text-right">
            <p className="inline-block bg-primary text-primary-content p-4 rounded-xl">Fine!</p>
          </li>
        </ul>
        <form className="flex flex-row" onSubmit={(e) => e.preventDefault()}>
          <input type="text" className="input input-bordered w-full" />
          <button className="btn btn-ghost rounded-full ml-4 px-0 w-12 h-12">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
};

export default Index;
