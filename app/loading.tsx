'use client';

export default function Loading() {
  return (
    <div className="bg-black flex min-h-screen justify-center items-center flex-col">
      <div className="pb-4">
        <h1 className="text-white text-primary font-primary font-bold mb-3">Just give us a second.</h1>
      </div>
      <div className="flex justify-center items-center">
      <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4"></circle>
        <path className="opacity-75" fill="#fff" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      </div>
    </div>
  );
}