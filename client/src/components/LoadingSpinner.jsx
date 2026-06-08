import { Loader } from "lucide-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white transition-colors duration-300 dark:bg-zinc-950">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20" />
        <Loader className="h-16 w-16 animate-spin text-blue-600 dark:text-blue-400" />
      </div>

      <h2 className="mt-6 text-xl font-semibold text-zinc-800 dark:text-zinc-100">
        Loading...
      </h2>

      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Please wait while we prepare everything for you.
      </p>
    </div>
  );
};

export default LoadingSpinner;