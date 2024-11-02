'use client';

import React, { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Clock, Calendar as CalendarIcon, User, LogOutIcon, CalendarDays, CheckCircle2, Trash2 } from 'lucide-react';

import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type TimeSlot = { start: string; end: string }
type DaySchedule = { [day: string]: TimeSlot[] }

const UpcomingInterviews = () => (
  <ScrollArea className="h-[calc(100vh-8rem)] px-6">
    <div className="space-y-8 py-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Next Interview</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="h-5 w-5" />
                    <span>October 31, 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>2:00 PM - 3:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-5 w-5" />
                    <span>Sarah Smith (Interviewer)</span>
                  </div>
                </div>
                <Badge>Upcoming</Badge>
              </div>
              <div className="flex gap-4 mt-6">
                <Button className="flex-1">Join Meeting</Button>
                <Button variant="outline" className="flex-1">Reschedule</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Past Interviews</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="h-5 w-5" />
                    <span>October 25, 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>10:00 AM - 11:00 AM</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-5 w-5" />
                    <span>Mike Johnson</span>
                  </div>
                </div>
                <Badge variant="secondary">Completed</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="h-5 w-5" />
                    <span>October 20, 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>3:00 PM - 4:00 PM</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </ScrollArea>
);

const SetAvailability = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [daySchedules, setDaySchedules] = useState<DaySchedule>({})
  const { toast } = useToast()

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
      <div className="container mx-auto py-10 relative">
        <h1 className="text-4xl font-bold mb-8 text-center">Set Your Availability</h1>
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
            <Button>
              <CheckCircle2 className="mr-2 h-4 w-4" /> Save Availability
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </>
  )
}

const Header = () => {
  const { data: session } = useSession()

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
      <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white text-xl font-semibold">
            M
          </div>
        <h1 className="text-xl font-semibold">MockPrep</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={session?.user?.image || ''} />
            <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <span>{session?.user?.name}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: '/' })}>
          <LogOutIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

const MockPrep = () => {
  return (
    // <div className="max-w-full mx-auto bg-background min-h-screen">

    //   <Header />
    //   <div className="max-w-2xl mx-auto mt-2">

    //     <Tabs defaultValue="upcoming" className="w-full">
    //       <TabsList className="w-full grid grid-cols-2">
    //         <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
    //         <TabsTrigger value="availability">Set Availability</TabsTrigger>
    //       </TabsList>
    //       <TabsContent value="upcoming">
    //         <UpcomingInterviews />
    //       </TabsContent>
    //       <TabsContent value="availability">
    //         <SetAvailability />
    //       </TabsContent>
    //     </Tabs>
    //   </div>
    // </div>
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
<UpcomingInterviews />
      </div>
    </SidebarInset>
  </SidebarProvider>
  );
};

export default MockPrep;
