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
    <div className="flex flex-col items-center">
      <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-mono font-light text-white tabular-nums">
        {formattedValue}
      </div>
      <div className="mt-2 text-gray-400 text-sm sm:text-base font-medium uppercase tracking-wider">{label}</div>
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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-6xl mx-auto">
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4 tracking-tight">
          We're launching
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-normal">
            something amazing
          </span>
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
          Get ready for an extraordinary experience. Our revolutionary platform launches August 17th, 2025.
        </p>

        {/* Simple Countdown Numbers */}
        <div className="flex justify-center items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 mb-16">
          <CountdownNumber value={timeLeft.days} label="Days" />
          <div className="text-gray-600 text-4xl sm:text-5xl md:text-6xl font-light">:</div>
          <CountdownNumber value={timeLeft.hours} label="Hours" />
          <div className="text-gray-600 text-4xl sm:text-5xl md:text-6xl font-light">:</div>
          <CountdownNumber value={timeLeft.minutes} label="Minutes" />
          <div className="text-gray-600 text-4xl sm:text-5xl md:text-6xl font-light">:</div>
          <CountdownNumber value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Call to action */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base">
              Notify Me
            </button>
            <button className="px-8 py-3 border border-gray-700 text-white font-medium rounded-full hover:border-gray-600 transition-colors duration-200 text-sm sm:text-base">
              Learn More
            </button>
          </div>

          <p className="text-gray-500 text-sm">Be the first to know when we launch</p>
        </div>
      </div>
    </div>
  )
}
