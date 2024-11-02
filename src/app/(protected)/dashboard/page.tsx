'use client';

import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, User, Plus, X, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { signOut, useSession } from 'next-auth/react';

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
                    <Calendar className="h-5 w-5" />
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
                    <Calendar className="h-5 w-5" />
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
                    <Calendar className="h-5 w-5" />
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minute = i % 2 === 0 ? '00' : '30';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute} ${ampm}`;
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };
  const handleAddTimeSlot = () => {
    const newSlot = {
      date: selectedDate,
      startTime: '9:00 AM',
      endTime: '10:00 AM'
    };
    setSelectedTimeSlots([...selectedTimeSlots, newSlot]);
  };

  const handleRemoveTimeSlot = (index: number) => {
    const newTimeSlots = selectedTimeSlots.filter((_, i) => i !== index);
    setSelectedTimeSlots(newTimeSlots);
  };

  return (
    <ScrollArea className="h-[calc(100vh-8rem)] px-6">
      <div className="space-y-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 text-center text-muted-foreground">
                Calendar Placeholder
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Available Time Slots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>{formatDate(selectedDate)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.slice(0, -2).map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleAddTimeSlot}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Selected Time Slots</h3>
          <div className="space-y-3">
            {selectedTimeSlots.map((slot, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span>{formatDate(slot.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span>{slot.startTime} - {slot.endTime}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveTimeSlot(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">Cancel</Button>
          <Button className="flex-1">Save Availability</Button>
        </div>
      </div>
    </ScrollArea>
  );
};

const MockPrep = () => {
  const { data: session } = useSession()

  return (
    <div className="max-w-2xl mx-auto bg-background min-h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
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

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Interviews</TabsTrigger>
          <TabsTrigger value="availability">Set Availability</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <UpcomingInterviews />
        </TabsContent>
        <TabsContent value="availability">
          <SetAvailability />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MockPrep;
