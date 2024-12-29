'use client'

import { useState } from 'react'
import Counter from '@/components/Counter'
import Countdown from '@/components/Countdown'

export default function Home() {
  const [activeComponent, setActiveComponent] = useState<'counter' | 'countdown'>('counter')

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 
        bg-clip-text text-transparent text-center">
        {activeComponent === 'counter' ? 'Sayaç Uygulaması' : 'Geri Sayım'}
      </h1>

      <div className="flex gap-4 justify-center mb-8">
        <button
          onClick={() => setActiveComponent('counter')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300
            ${activeComponent === 'counter'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
              : 'bg-gray-700/30 text-gray-300 hover:bg-gray-700/50'
            }`}
        >
          Sayaç
        </button>
        <button
          onClick={() => setActiveComponent('countdown')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300
            ${activeComponent === 'countdown'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
              : 'bg-gray-700/30 text-gray-300 hover:bg-gray-700/50'
            }`}
        >
          Geri Sayım
        </button>
      </div>

      {activeComponent === 'counter' ? <Counter /> : <Countdown />}
    </div>
  )
} 