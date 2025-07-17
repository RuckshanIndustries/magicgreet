"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownNumberProps {
  value: number
  label: string
}

function CountdownNumber({ value, label }: CountdownNumberProps) {
  const formattedValue = value.toString().padStart(2, "0")

  return (
    <div className="flex flex-col items-center min-w-0">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-mono font-light text-white tabular-nums">
        {formattedValue}
      </div>
      <div className="mt-1 sm:mt-2 text-gray-400 text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider text-center">
        {label}
      </div>
    </div>
  )
}

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-08-17T00:00:00").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div className="text-center max-w-6xl mx-auto w-full">
        {/* Main heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 tracking-tight leading-tight px-2">
          We're launching
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-normal mt-1">
            something amazing
          </span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-12 sm:mb-16 max-w-2xl mx-auto leading-relaxed px-4">
          Get ready for an extraordinary experience. Our revolutionary platform launches August 17th, 2025.
        </p>

        {/* Simple Countdown Numbers */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 mb-12 sm:mb-16 px-2">
          <CountdownNumber value={timeLeft.days} label="Days" />
          <div className="text-gray-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light opacity-60 px-1">:</div>
          <CountdownNumber value={timeLeft.hours} label="Hours" />
          <div className="text-gray-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light opacity-60 px-1">:</div>
          <CountdownNumber value={timeLeft.minutes} label="Minutes" />
          <div className="text-gray-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light opacity-60 px-1">:</div>
          <CountdownNumber value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Call to action */}
        <div className="space-y-6 px-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base min-w-[140px]">
              Notify Me
            </button>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 border border-gray-700 text-white font-medium rounded-full hover:border-gray-600 transition-colors duration-200 text-sm sm:text-base min-w-[140px]">
              Learn More
            </button>
          </div>

          <p className="text-gray-500 text-xs sm:text-sm text-center px-2">Be the first to know when we launch</p>
        </div>
      </div>
    </div>
  )
}
