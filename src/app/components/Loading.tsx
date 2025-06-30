export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center py-10 px-2">
      <div className="flex flex-col items-center">
        <div className="animate-pulse">
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" fill="#a78bfa" />
            <path
              d="M8 12.5l2.5 2.5L16 9"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold mt-4 text-gray-700">
          로딩 중...
        </h1>
      </div>
    </div>
  );
}
