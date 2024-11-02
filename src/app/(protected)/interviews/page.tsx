'use client';

import { Clock, Calendar as CalendarIcon, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area'

const UpcomingInterviews = () => (
  <ScrollArea className="h-[calc(100vh-8rem)] px-6">
    <div className="space-y-8 py-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Next Interview</h2>
        <div className="flex flex-col sm:flex-row gap-8 sm:px-0 px-4">
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

export default UpcomingInterviews;
