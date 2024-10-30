// app/dashboard/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'

export default function Dashboard() {
  const { data: session } = useSession()
  const [upcomingInterviews, setUpcomingInterviews] = useState([])
  const [availableSlots, setAvailableSlots] = useState([])

  useEffect(() => {
    if (session?.user?.id) {
      fetchUpcomingInterviews()
      fetchAvailableSlots()
    }
  }, [session])

  const fetchUpcomingInterviews = async () => {
    const res = await fetch('/api/interviews/upcoming')
    const data = await res.json()
    setUpcomingInterviews(data)
  }

  const fetchAvailableSlots = async () => {
    const res = await fetch('/api/slots/available')
    const data = await res.json()
    setAvailableSlots(data)
  }

  const addTimeSlot = async (startTime: Date, duration: number) => {
    const res = await fetch('/api/slots/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startTime, duration }),
    })
    if (res.ok) {
      fetchAvailableSlots()
    }
  }

  const bookInterview = async (slotId: string) => {
    const res = await fetch('/api/interviews/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slotId }),
    })
    if (res.ok) {
      fetchUpcomingInterviews()
      fetchAvailableSlots()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Interviews */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
          {upcomingInterviews.map((interview: any) => (
            <div key={interview.id} className="mb-4 p-4 border rounded">
              <p className="font-medium">
                {format(new Date(interview.timeSlot.startTime), 'PPp')}
              </p>
              <p>Duration: {interview.timeSlot.duration} minutes</p>
              <p>Meet Link: {interview.meetLink}</p>
            </div>
          ))}
        </div>

        {/* Available Slots */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
          {availableSlots.map((slot: any) => (
            <div key={slot.id} className="mb-4 p-4 border rounded">
              <p className="font-medium">
                {format(new Date(slot.startTime), 'PPp')}
              </p>
              <p>Duration: {slot.duration} minutes</p>
              <button
                onClick={() => bookInterview(slot.id)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Book Interview
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}