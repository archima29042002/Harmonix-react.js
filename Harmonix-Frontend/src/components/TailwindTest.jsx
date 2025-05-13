export function TailwindTest() {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-green-500 mb-4">Tailwind Test</h2>
        <div className="bg-zinc-800 p-4 rounded-lg">
          <p className="text-white">If you can see this with styling, Tailwind is working!</p>
        </div>
        <div className="mt-4 flex space-x-2">
          <div className="w-10 h-10 bg-red-500 rounded-full"></div>
          <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
          <div className="w-10 h-10 bg-green-500 rounded-full"></div>
        </div>
      </div>
    )
  }
  
  