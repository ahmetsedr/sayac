'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export default function Countdown() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timeInSeconds, setTimeInSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'hours' | 'minutes' | 'seconds' | null>(null)
  
  // Alarm için audio referansı
  const alarmRef = useRef<HTMLAudioElement | null>(null)

  // Component mount olduğunda audio elementini oluştur
  useEffect(() => {
    alarmRef.current = new Audio('/alarm.mp3') // public klasörüne alarm.mp3 eklenecek
    alarmRef.current.volume = 0.5 // Ses seviyesi (0.0 - 1.0)
    return () => {
      if (alarmRef.current) {
        alarmRef.current.pause()
        alarmRef.current = null
      }
    }
  }, [])

  // Geri sayım bittiğinde alarmı çal
  const playAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.currentTime = 0 // Sesi başa sar
      alarmRef.current.play()
      // 3 saniye sonra alarmı durdur
      setTimeout(() => {
        if (alarmRef.current) {
          alarmRef.current.pause()
        }
      }, 3000)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.time-dropdown')) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const updateTitle = () => {
    let title = 'Geri Sayım'
    if (isRunning && timeInSeconds > 0) {
      const h = Math.floor(timeInSeconds / 3600)
      const m = Math.floor((timeInSeconds % 3600) / 60)
      const s = timeInSeconds % 60
      title = `${formatNumber(h)}:${formatNumber(m)}:${formatNumber(s)} | ${title}`
    } else if (!isRunning && (hours > 0 || minutes > 0 || seconds > 0)) {
      title = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)} | ${title}`
    }
    document.title = title
  }

  useEffect(() => {
    updateTitle()
  }, [timeInSeconds, isRunning, hours, minutes, seconds])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeInSeconds > 0) {
      interval = setInterval(() => {
        setTimeInSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            playAlarm() // Süre bittiğinde alarmı çal
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeInSeconds])

  const startCountdown = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds
    if (totalSeconds > 0) {
      setTimeInSeconds(totalSeconds)
      setIsRunning(true)
    }
  }

  const resetCountdown = () => {
    setIsRunning(false)
    setTimeInSeconds(0)
    setHours(0)
    setMinutes(0)
    setSeconds(0)
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  const displayTime = () => {
    const h = Math.floor(timeInSeconds / 3600)
    const m = Math.floor((timeInSeconds % 3600) / 60)
    const s = timeInSeconds % 60
    return `${formatNumber(h)}:${formatNumber(m)}:${formatNumber(s)}`
  }

  const TimeInput = ({ 
    value, 
    onChange, 
    type,
    placeholder 
  }: { 
    value: number
    onChange: (value: number) => void
    type: 'hours' | 'minutes' | 'seconds'
    placeholder: string 
  }) => {
    const max = type === 'hours' ? 23 : 59
    const numbers = Array.from({ length: max + 1 }, (_, i) => i)

    return (
      <div className="relative time-dropdown">
        <div className="flex items-center">
          <input
            type="text"
            value={formatNumber(value)}
            readOnly
            className="w-24 bg-gray-700/50 text-center text-2xl rounded-xl p-4 cursor-pointer"
            placeholder={placeholder}
            onClick={(e) => {
              e.stopPropagation()
              setActiveDropdown(type)
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation()
              setActiveDropdown(type)
            }}
            className="absolute right-2 p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
          >
            <ChevronDownIcon className="w-5 h-5 text-gray-300" />
          </button>
        </div>
        {activeDropdown === type && (
          <div className="absolute mt-2 w-full max-h-48 overflow-y-auto bg-gray-800/95 
            rounded-xl shadow-xl border border-gray-700 backdrop-blur-lg z-50 
            scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <div className="flex flex-col p-1">
              {numbers.map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    onChange(num)
                    setActiveDropdown(null)
                  }}
                  className="px-4 py-2 text-center hover:bg-gray-700/50 rounded-lg transition-colors
                    text-lg font-medium flex items-center justify-center
                    hover:text-white active:bg-gray-600/50"
                >
                  {formatNumber(num)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <main className="space-y-12 bg-gradient-to-br from-gray-800/40 to-gray-900/40 
      backdrop-blur-lg p-12 rounded-[2rem] border border-gray-700/30 
      shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:shadow-purple-500/10 
      transition-all duration-500 hover:scale-[1.02]">
      <article className="space-y-8">
        <header>
          <h2 className="sr-only">Geri Sayım Zamanlayıcı</h2>
        </header>
        {!isRunning ? (
          <div className="flex gap-4 justify-center">
            <TimeInput
              value={hours}
              onChange={setHours}
              type="hours"
              placeholder="Saat"
            />
            <TimeInput
              value={minutes}
              onChange={setMinutes}
              type="minutes"
              placeholder="Dakika"
            />
            <TimeInput
              value={seconds}
              onChange={setSeconds}
              type="seconds"
              placeholder="Saniye"
            />
          </div>
        ) : (
          <div className="relative">
            <div className="text-9xl font-black text-center tabular-nums 
              bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent
              transition-all duration-300 ease-out transform hover:scale-110 
              p-8 rounded-2xl backdrop-blur-sm animate-pulse-slow">
              {displayTime()}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
              blur-3xl -z-10 rounded-full opacity-75">
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-6 justify-center mt-12">
          {!isRunning ? (
            <button
              onClick={startCountdown}
              className="btn-base group bg-gradient-to-br from-emerald-500/80 to-green-600/80 
                hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              <span className="relative z-10">Başlat</span>
              <div className="btn-gradient-hover bg-gradient-to-br from-emerald-400 to-green-500"></div>
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="btn-base group bg-gradient-to-br from-amber-500/80 to-orange-600/80 
                hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              <span className="relative z-10">Duraklat</span>
              <div className="btn-gradient-hover bg-gradient-to-br from-amber-400 to-orange-500"></div>
            </button>
          )}
          
          <button
            onClick={resetCountdown}
            className="btn-base group bg-gradient-to-br from-red-500/80 to-rose-600/80 
              hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]"
          >
            <span className="relative z-10">Sıfırla</span>
            <div className="btn-gradient-hover bg-gradient-to-br from-red-400 to-rose-500"></div>
          </button>
        </div>
      </article>
    </main>
  )
}
