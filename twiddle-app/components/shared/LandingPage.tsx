import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      {" "}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-12 p-5">
        <div className="flex justify-center">
          <Image
            src="assets/logo copy.svg"
            alt="Logo"
            width={400}
            height={400}
            className="w-1/2 lg:w-full"
          />
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <h1 className="font-extrabold text-white text-6xl mb-5 lg:mb-15 text-center lg:text-left">
            Happening Now
          </h1>
          <p className="text-white text-xl lg:text-3xl mb-5 lg:mb-10 text-center lg:text-left">
            Join Today.
          </p>

          <SignInButton>
            <button className="lg:w-72 text-black mx-6 my-2 lg:mx-0 lg:my-2 px-6 py-2 rounded-lg bg-white hover:bg-slate-300">
              Login
            </button>
          </SignInButton>

          <SignUpButton>
            <button className="lg:w-72 text-black mx-6 my-2 lg:mx-0 lg:my-2 px-6 py-2 rounded-lg bg-emerald-100 hover:bg-green-300">
              Register
            </button>
          </SignUpButton>
        </div>
      </div>
    </>
  );
}
