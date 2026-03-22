export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-gray-800 rounded-2xl w-fit">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
      <span className="text-gray-400 text-xs ml-2">CricketGPT is analysing...</span>
    </div>
  );
}