import { Link } from "react-router-dom";

import fourOFour from "@/assets/404.webp";

export function NotFoundPage() {
  return (
    <main className="flex w-full h-screen items-center justify-center">
      <div className="container flex flex-col items-center justify-center *:text-center">
        <div>
          <img src={fourOFour} alt="404" className="w-96" title="Page Not Found" />
        </div>
        <h1 className="capitalize text-4xl sm:text-5xl text-slate-800 font-semibold mb-2">Page not found</h1>
        <p className="text-zinc-500 text-lg text-pretty">sorry, we couldn’t find the page you are looking for</p>
        <Link to="/" className="bg-royal-blue text-white px-4 py-2 rounded-md mt-4 capitalize font-medium">
          Go to Home
        </Link>
      </div>
    </main>
  );
}
