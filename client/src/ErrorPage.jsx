import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // useRouteError hook to get the error object
  const error = useRouteError();

  return (
    <div className="bg-yellow-500 text-center mt-5 p-5">
      <h1 className="text-red-800 text-4xl">
        {error.status} -- {error.data}
      </h1>
    </div>
  );
}
