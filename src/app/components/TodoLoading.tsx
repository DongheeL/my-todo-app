export default function TodoLoading() {
  return (
    <li className="text-gray-400 text-center py-6 flex flex-col items-center">
      <div className="animate-pulse mb-2">
        <svg
          width="36"
          height="36"
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
      로딩 중...
    </li>
  );
}
