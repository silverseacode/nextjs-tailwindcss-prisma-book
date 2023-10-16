import React from "react";

export default function Loading() {
  return (
    <div className="grid gap-4 sm:grid-cols-4 max-w-6xl mx-auto">
      <aside className="flex flex-row h-[7rem] sm:col-start-1 sm:col-end-2 bg-white p-4 sm:flex-col sm:justify-center items-center sm:h-[20rem] rounded-lg shadow-lg"></aside>

      <div className="sm:col-start-2 sm:col-end-4 space-y-4 ">
        <div className="sm:col-start-2 sm:col-end-4 bg-white rounded-lg shadow-lg p-4 h-[7rem]"></div>

        <div className="sm:col-start-2 sm:col-end-4 bg-white p-4 h-[40rem] flex flex-col justify-center items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-black"></div>
        </div>
      </div>

      <aside className=" bg-white p-4 hidden sm:col-start-4  sm:grid h-[20rem] "></aside>
    </div>
  );
}
