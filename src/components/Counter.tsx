'use client'

import { useState, useEffect } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)

  useEffect(() => {
    let title = 'Sayaç Uygulaması'
    if (count < 0) {
      title = `Negatif Sayaç: ${count} | ${title}`
    } else if (count > 0) {
      title = `Pozitif Sayaç: ${count} | ${title}`
    }
    document.title = title
  }, [count])

  const getCountColors = () => {
    if (count < 0) {
      return 'from-red-400 via-red-500 to-rose-500'
    } else if (count > 0) {
      return 'from-emerald-400 via-green-500 to-teal-500'
    }
    return 'from-violet-400 via-purple-500 to-pink-500'
  }

  const getGlowColors = () => {
    if (count < 0) {
      return 'from-red-500/20 to-rose-500/20'
    } else if (count > 0) {
      return 'from-emerald-500/20 to-green-500/20'
    }
    return 'from-purple-500/20 to-pink-500/20'
  }

  return (
    <div className="space-y-12 bg-gradient-to-br from-gray-800/40 to-gray-900/40 
      backdrop-blur-lg p-12 rounded-[2rem] border border-gray-700/30 
      shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:shadow-purple-500/10 
      transition-all duration-500 hover:scale-[1.02]">
      
      <div className="relative">
        <div className={`text-9xl font-black text-center tabular-nums 
          bg-gradient-to-br ${getCountColors()} bg-clip-text text-transparent
          transition-all duration-300 ease-out transform hover:scale-110 
          p-8 rounded-2xl backdrop-blur-sm
          animate-pulse-slow`}>
          {count}
        </div>
        <div className={`absolute inset-0 bg-gradient-to-r ${getGlowColors()}
          blur-3xl -z-10 rounded-full opacity-75`}>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-6 justify-center mt-12">
        <button
          onClick={decrement}
          className="btn-base group bg-gradient-to-br from-red-500/80 to-rose-600/80 
            hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]"
        >
          <span className="relative z-10">Azalt</span>
          <div className="btn-gradient-hover bg-gradient-to-br from-red-400 to-rose-500"></div>
        </button>
        
        <button
          onClick={reset}
          className="btn-base group bg-gradient-to-br from-slate-600/80 to-slate-700/80
            hover:shadow-[0_0_30px_rgba(100,116,139,0.3)]"
        >
          <span className="relative z-10">Sıfırla</span>
          <div className="btn-gradient-hover bg-gradient-to-br from-slate-500 to-slate-600"></div>
        </button>
        
        <button
          onClick={increment}
          className="btn-base group bg-gradient-to-br from-emerald-500/80 to-green-600/80
            hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
        >
          <span className="relative z-10">Artır</span>
          <div className="btn-gradient-hover bg-gradient-to-br from-emerald-400 to-green-500"></div>
        </button>
      </div>
    </div>
  )
} 