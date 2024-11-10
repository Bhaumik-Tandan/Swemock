'use client'

import { useState, useMemo } from 'react'
import { format, isSameDay } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

// Mock data
const skills = ['React', 'Node.js', 'Python', 'Java', 'C++']

// Mock function to generate available dates (in a real app, this would come from an API)
const getAvailableDates = () => {
  const today = new Date()
  const availableDates = []
  for (let i = 1; i <= 30; i++) {
    if (Math.random() > 0.5) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      availableDates.push(date)
    }
  }
  return availableDates
}

// Mock time slots with interviewers
const timeSlots = [
  { time: '09:00 AM', interviewer: 'Alice Johnson' },
  { time: '11:00 AM', interviewer: 'Bob Smith' },
  { time: '02:00 PM', interviewer: 'Charlie Brown' },
  { time: '04:00 PM', interviewer: 'Diana Prince' },
]

export default function InterviewScheduler() {
  const [selectedSkill, setSelectedSkill] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<typeof timeSlots[0] | null>(null)

  const availableDates = useMemo(() => getAvailableDates(), [])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTimeSlot(null)
  }

  const handleSubmit = () => {
    if (selectedSkill && selectedDate && selectedTimeSlot) {
      console.log('Scheduled interview:', {
        skill: selectedSkill,
        date: format(selectedDate, 'MMMM d, yyyy'),
        time: selectedTimeSlot.time,
        interviewer: selectedTimeSlot.interviewer,
      })
      // Here you would typically send this data to your backend
    }
  }

  return (
    <div className="container">      
      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-l font-semibold mb-4">Select a skill for your interview</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                variant={selectedSkill === skill ? 'default' : 'outline'}
                className="flex-grow sm:flex-grow-0"
              >
                {skill}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-8 sm:px-0 px-4">
        <Card className="flex-none sm:w-fit">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border shadow"
              modifiers={{
                available: (date) => availableDates.some((availableDate) => isSameDay(date, availableDate)),
                selected: (date) => selectedDate ? isSameDay(date, selectedDate) : false,
              }}
              modifiersStyles={{
                available: { fontWeight: 'bold' },
                selected: { backgroundColor: 'black', color: 'white' },
              }}
              disabled={(date) => !availableDates.some((availableDate) => isSameDay(date, availableDate))}
            />
          </CardContent>
        </Card>

        <Card className="flex-grow">
          <CardContent className="p-4">
            <h2 className="text-l font-semibold mb-4">
              {selectedDate
                ? `Available time slots for ${format(selectedDate, 'MMMM d, yyyy')}`
                : 'Select a date to see available time slots'}
            </h2>
            {selectedDate && (
              <ScrollArea className="">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    onClick={() => setSelectedTimeSlot(slot)}
                    variant={selectedTimeSlot === slot ? 'default' : 'outline'}
                    className="w-full justify-between mb-2"
                  >
                    <span>{slot.time}</span>
                    <span>{slot.interviewer}</span>
                  </Button>
                ))}
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 text-center">
        <Button
          onClick={handleSubmit}
          disabled={!selectedSkill || !selectedDate || !selectedTimeSlot}
          size="lg"
        >
          Schedule Interview
        </Button>
      </div>
    </div>
  )
}
