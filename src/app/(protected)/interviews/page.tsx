'use client';

import React from 'react';
import { Clock, Calendar as CalendarIcon, User, VideoIcon, Building, FileText, Star, MessageSquare, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const pastInterviews = [
  {
    date: "October 25, 2024",
    time: "10:00 AM - 11:00 AM",
    duration: "1 hour",
    interviewer: "Mike Johnson",
    interviewerRole: "Senior Engineering Manager",
    department: "Engineering",
    position: "Senior Frontend Developer",
    status: "Completed",
    rating: 4,
    hasNotes: true,
    hasFeedback: true,
    recordingUrl: "/recording1",
    feedback: "Excellent technical skills and communication. Demonstrated strong problem-solving abilities.",
    notes: "Discussed system design, React performance optimization, and team leadership experience.",
    nextSteps: "Moving forward to final round with CTO",
  },
  {
    date: "October 20, 2024",
    time: "3:00 PM - 4:00 PM",
    duration: "1 hour",
    interviewer: "Sarah Parker",
    interviewerRole: "Tech Lead",
    department: "Product",
    position: "Full Stack Developer",
    status: "Cancelled",
    hasNotes: false,
    hasFeedback: true,
    feedback: "Candidate requested to reschedule due to emergency",
    nextSteps: "Waiting for candidate's availability",
  },
  {
    date: "October 18, 2024",
    time: "2:00 PM - 3:30 PM",
    duration: "1.5 hours",
    interviewer: "Alex Thompson",
    interviewerRole: "Principal Engineer",
    department: "Platform",
    position: "Senior Backend Developer",
    status: "Completed",
    rating: 5,
    hasNotes: true,
    hasFeedback: true,
    recordingUrl: "/recording2",
    feedback: "Outstanding performance in system design and architectural discussions.",
    notes: "Deep dive into distributed systems, cache strategies, and API design patterns.",
    nextSteps: "Offer to be extended",
  },
];

const upcomingInterviews = [
  {
    date: "Monday, March 4, 2024",
    time: "10:00 AM",
    duration: "1 hour",
    interviewer: "Sarah Johnson",
    status: "upcoming",
    type: "2",
    preparationComplete: false
  },
  {
    date: "Monday, March 4, 2024",
    time: "10:00 AM",
    duration: "1 hour",
    interviewer: "Sarah Johnson",
    status: "upcoming",
    type: "2",
    preparationComplete: false
  },
  {
    date: "Monday, March 4, 2024",
    time: "10:00 AM",
    duration: "1 hour",
    interviewer: "Sarah Johnson",
    status: "upcoming",
    type: "2",
    preparationComplete: false
  },
  {
    date: "Monday, March 4, 2024",
    time: "10:00 AM",
    duration: "1 hour",
    interviewer: "Sarah Johnson",
    status: "upcoming",
    type: "2",
    preparationComplete: false
  },
];

const PastInterviewDetails = ({ interview }: { interview: typeof pastInterviews[0] }) => (
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Interview Details</DialogTitle>
      <DialogDescription>
        Complete interview information and feedback
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Interview Information</h3>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Date: {interview.date}</p>
            <p className="text-sm text-muted-foreground">Time: {interview.time}</p>
            <p className="text-sm text-muted-foreground">Duration: {interview.duration}</p>
            <p className="text-sm text-muted-foreground">Position: {interview.position}</p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Interviewer Details</h3>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Name: {interview.interviewer}</p>
            <p className="text-sm text-muted-foreground">Role: {interview.interviewerRole}</p>
            <p className="text-sm text-muted-foreground">Department: {interview.department}</p>
          </div>
        </div>
      </div>

      {interview.feedback && interview.rating && (
        <div className="space-y-2">
          <h3 className="font-semibold">Feedback</h3>
          <p className="text-sm text-muted-foreground">{interview.feedback}</p>
          <div className="flex items-center gap-2 text-yellow-500">
            {Array.from({ length: interview.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
        </div>
      )}

      {interview.notes && (
        <div className="space-y-2">
          <h3 className="font-semibold">Interview Notes</h3>
          <p className="text-sm text-muted-foreground">{interview.notes}</p>
        </div>
      )}

      {interview.nextSteps && (
        <div className="space-y-2">
          <h3 className="font-semibold">Next Steps</h3>
          <p className="text-sm text-muted-foreground">{interview.nextSteps}</p>
        </div>
      )}
    </div>
  </DialogContent>
);

const PastInterviewCard = ({ interview }: { interview: typeof pastInterviews[0] }) => (
  <Dialog>
    <Card className="group transition-all duration-300 hover:shadow-md">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
              <CalendarIcon className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">{interview.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
              <Clock className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">{interview.time}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
              <User className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">{interview.interviewer}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
              <Building className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">{interview.position}</span>
            </div>
            {interview.rating && (
              <div className="flex items-center gap-2 text-yellow-500">
                {Array.from({ length: interview.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between items-end gap-4">
            <Badge
              variant="secondary"
              className={cn(
                "px-3 py-1",
                {
                  "bg-blue-100 text-blue-800 hover:bg-blue-200": interview.status === "Completed",
                  "bg-red-100 text-red-800 hover:bg-red-200": interview.status === "Cancelled",
                  "bg-yellow-100 text-yellow-800 hover:bg-yellow-200": interview.status === "Rescheduled"
                }
              )}
            >
              {interview.status}
            </Badge>
            <div className="flex gap-2">
              {interview.hasNotes && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                  title='View Notes'
                >
                  <FileText className="h-4 w-4" />
                </Button>
              )}
              {interview.hasFeedback && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                  title='View Feedback'
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              )}
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </DialogTrigger>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <PastInterviewDetails interview={interview} />
  </Dialog>
);

const UpcomingMeetingCard = ({
  meeting,
  className
}: {
  meeting: {
    date: string;
    time: string;
    duration: string;
    interviewer: string;
    status: string;
    type: string;
    preparationComplete: boolean;
  },
  className?: string
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
      "w-full max-w-md bg-gradient-to-br from-white to-gray-50",
      className
    )}>
      <CardContent className="pt-6">
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg text-primary">
                Technical Interview
              </h3>
              {/* <p className="text-sm text-muted-foreground">
                Round {meeting.type}
              </p> */}
            </div>
            <Badge
              variant="secondary"
              className={cn(
                "transition-colors",
                "capitalize",
                getStatusColor(meeting.status)
              )}
            >
              {meeting.status}
            </Badge>
          </div>

          {/* Meeting Details */}
          <div className="space-y-2 bg-gray-50 py-4 rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <CalendarIcon className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm font-medium">{meeting.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Clock className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm font-medium">
                {meeting.time} ({meeting.duration})
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <User className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm font-medium">{meeting.interviewer}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Laptop className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm font-medium">Remote Interview</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 hover:bg-secondary border-primary/20"
            >
              Reschedule
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              <VideoIcon className="h-4 w-4 mr-2" />
              Join Meeting
            </Button>
          </div>
      </CardContent>
    </Card>
  );
};

const Interviews = () => {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)] px-4">
      <div className="space-y-8 pb-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Next Interview</h2>
          <div className="container">
            <div className="flex flex-wrap gap-4">
              {upcomingInterviews.map((meeting, index) => (
                <UpcomingMeetingCard
                  key={index}
                  meeting={meeting}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Past Interviews</h2>
          <div className="container mx-auto">

            <div className="grid grid-cols-2 gap-4">
              {pastInterviews.map((interview, index) => (
                <PastInterviewCard
                  key={index}
                  interview={interview}
                />
              ))}
            </div>

            {pastInterviews.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No interviews found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Interviews;
