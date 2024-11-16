'use client';

import React, { useState, useEffect } from 'react';
import { Clock, CalendarDays, CheckCircle2, Trash2 } from 'lucide-react';

import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'

type TimeSlot = { start: string; end: string }
type DaySchedule = { [day: string]: TimeSlot[] }

const timeSlots: TimeSlot[] = [
  { start: '09:00', end: '10:00' },
  { start: '10:00', end: '11:00' },
  { start: '11:00', end: '12:00' },
  { start: '12:00', end: '13:00' },
  { start: '13:00', end: '14:00' },
  { start: '14:00', end: '15:00' },
  { start: '15:00', end: '16:00' },
  { start: '16:00', end: '17:00' },
  { start: '17:00', end: '18:00' },
  { start: '18:00', end: '19:00' },
  { start: '19:00', end: '20:00' },
  { start: '20:00', end: '21:00' },
]
  
const SetAvailability = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [daySchedules, setDaySchedules] = useState<DaySchedule>({})
  const { toast } = useToast()

  const formatDate = (date: Date) => date.toISOString().split('T')[0]

  const toggleTimeSlot = (date: string, slot: TimeSlot) => {
    setDaySchedules(prev => {
      const updatedSlots = prev[date] ? [...prev[date]] : []
      const index = updatedSlots.findIndex(s => s.start === slot.start && s.end === slot.end)
      if (index > -1) {
        updatedSlots.splice(index, 1)
      } else {
        updatedSlots.push(slot)
      }
      return { ...prev, [date]: updatedSlots }
    })
  }

  const clearAvailability = () => {
    setSelectedDates([])
    setDaySchedules({})
  }

  const saveAvailabilities = async () => {
    const response = await fetch('/api/availabilities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(daySchedules),
    });
    
    if (!response.ok) {
      toast({
        title: "Error",
        description: "Failed to save availability",
        duration: 3000,
        variant: "destructive",
      })

      return;
    }
    
    toast({
      title: "Saved",
      description: "Your availability has been saved successfully",
      duration: 3000,
    })
  };

  useEffect(() => {
    if (selectedDates.length > 0) {
      toast({
        title: "Dates Selected",
        description: `${selectedDates.length} date(s) selected. Set your time slots now.`,
        duration: 3000,
      })
    }
  }, [selectedDates, toast])

  return (
    <>
      <div className="container mx-auto relative">
        <div className="flex flex-col sm:flex-row gap-8 sm:px-0 px-4">
          <Card className="flex-none sm:w-fit">
            <CardHeader>
              <CardTitle>Select Dates</CardTitle>
              <CardDescription>Choose the dates you&apos;re available <br className="md:hidden sm:block hidden" /> for interviews</CardDescription>
            </CardHeader>
            <CardContent className="w-fit mx-auto">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={setSelectedDates}
                className="rounded-md border shadow"
              />
            </CardContent>
          </Card>
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Set Time Slots</CardTitle>
              <CardDescription>Select available time slots for selected dates</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] rounded-md border p-4" >
                {selectedDates.map(date => (
                  <div key={formatDate(date)} className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">{date.toDateString()}</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={`${date}-${slot.start}`}
                          variant={daySchedules[formatDate(date)]?.some(s => s.start === slot.start) ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => toggleTimeSlot(formatDate(date), slot)}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {slot.start} - {slot.end}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Availability Summary</CardTitle>
            <CardDescription>Review your set availability</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] rounded-md border p-4">
              {Object.entries(daySchedules).map(([date, slots]) => (
                <div key={date} className="mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <CalendarDays className="mr-2 h-5 w-5" />
                    {new Date(date).toDateString()}
                  </h3>
                  <div className="ml-7 mt-2">
                    {slots.map(slot => (
                      <span key={`${date}-${slot.start}`} className="inline-block bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                        {slot.start} - {slot.end}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={clearAvailability}>
              <Trash2 className="mr-2 h-4 w-4" /> Clear All
            </Button>
            <Button onClick={saveAvailabilities}>
              <CheckCircle2 className="mr-2 h-4 w-4" /> Save Availability
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </>
  )
}

  
    export default SetAvailability