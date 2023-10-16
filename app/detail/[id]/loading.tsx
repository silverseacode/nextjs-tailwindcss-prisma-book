import React from 'react'

export default function Loading() {
  return (
    <div className="max-w-xl mx-auto h-[40rem] bg-white px-4 pt-4 flex flex-col justify-center items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-black"></div>
    </div>
  )
}
