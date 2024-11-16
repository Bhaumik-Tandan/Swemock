'use client'

import { useMemo, useState } from 'react'
import { format, isSameDay } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Clock, Globe, MonitorPlay, Brain, Code, Database, Server, Terminal } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

const skills = [
  { name: 'Frontend', icon: MonitorPlay },
  { name: 'Backend', icon: Server },
  { name: 'Database', icon: Database },
  { name: 'DevOps', icon: Terminal },
  { name: 'Algorithms', icon: Brain },
  { name: 'System Design', icon: Code },
]

const timeSlots = [
  { time: '10:00am', interviewer: 'Alice Johnson' },
  { time: '10:15am', interviewer: 'Bob Smith' },
  { time: '10:30am', interviewer: 'Charlie Brown' },
  { time: '10:45am', interviewer: 'Diana Prince' },
  { time: '11:00am', interviewer: 'Eva Green' },
  { time: '11:15am', interviewer: 'Frank Castle' },
  { time: '11:15am', interviewer: 'Frank Castle' },
  { time: '11:15am', interviewer: 'Frank Castle' },
  { time: '11:15am', interviewer: 'Frank Castle' },
  { time: '11:15am', interviewer: 'Frank Castle' },
  { time: '11:15am', interviewer: 'Frank Castle' },
  { time: '11:15am', interviewer: 'Frank Castle' },
  { time: '11:15am', interviewer: 'Frank Castle' },
]

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

export default function InterviewScheduler() {
  const [step, setStep] = useState(1)
  const [selectedSkill, setSelectedSkill] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<typeof timeSlots[0] | null>(null)

  const availableDates = useMemo(() => getAvailableDates(), [])

  const handleSkillSelect = (skill: string) => {
    setSelectedSkill(skill)
    setStep(2)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTimeSlot(null)
  }

  const handleBack = () => {
    setStep(1)
    setSelectedDate(undefined)
    setSelectedTimeSlot(null)
  }

  const handleConfirm = () => {
    if (selectedTimeSlot) {
      console.log('Scheduled:', { selectedSkill, selectedDate, selectedTimeSlot })
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {step === 1 ? (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-center">Select Your Interview Topic</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => {
              const Icon = skill.icon
              return (
                <Button
                  key={skill.name}
                  onClick={() => handleSkillSelect(skill.name)}
                  variant="outline"
                  className={`h-24 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.33%-0.75rem)] flex flex-col items-center justify-center gap-2 text-lg ${
                    selectedSkill === skill.name ? 'border-primary border-2' : ''
                  }`}
                >
                  <Icon className="h-8 w-8" />
                  {skill.name}
                </Button>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Interview Details */}
          <div className="w-full md:w-[240px] flex-shrink-0 space-y-6">
            <Button variant="ghost" onClick={handleBack} className="-ml-3">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{selectedSkill} Interview</h2>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>1 hour</span>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4" />
                  <span>Remote Interview</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Calendar and Time Slots */}
          <div className="flex-grow space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-lg font-medium">
                {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <Card className="p-4 w-full md:w-auto flex-shrink-0">
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
              </Card>

              <Card className="flex-grow">
                <CardContent className="p-4">
                  {selectedDate && (
                    <ScrollArea className="h-[300px] px-4">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedTimeSlot === slot
                        return (
                          <div key={slot.time} className="flex items-center gap-2 mb-2">
                            <Button
                              variant="outline"
                              className={`w-full h-12 text-left px-4 ${
                                isSelected ? 'bg-muted hover:bg-muted' : ''
                              }`}
                              onClick={() => setSelectedTimeSlot(slot)}
                              >
                              <span className="font-medium">{slot.time}</span>
                              <span className="text-sm text-muted-foreground ml-2">
                                {slot.interviewer}
                              </span>
                            </Button>
                            {isSelected && (
                              <Button className="h-12 px-4 whitespace-nowrap" onClick={handleConfirm}>
                                Confirm
                              </Button>
                            )}
                          </div>
                        )}
                      )}
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
