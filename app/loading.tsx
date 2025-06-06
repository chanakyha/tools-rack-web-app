import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-blue-900 dark:border-white"></div>
    </div>
  );
};

export default Loading;
