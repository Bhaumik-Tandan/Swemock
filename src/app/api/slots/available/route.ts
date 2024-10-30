// app/api/slots/available/route.ts

import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const slots = await prisma.timeSlot.findMany({
    where: {
      isBooked: false,
      startTime: {
        gte: new Date(),
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      startTime: 'asc',
    },
  })
  
  return NextResponse.json(slots)
}

// app/api/slots/create/route.ts

import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { startTime, duration } = await req.json()

  const slot = await prisma.timeSlot.create({
    data: {
      startTime: new Date(startTime),
      duration,
      userId: session.user.id,
    },
  })

  return NextResponse.json(slot)
}

// app/api/interviews/book/route.ts

import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { sendInterviewConfirmation } from '@/lib/mail'

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slotId } = await req.json()

  const slot = await prisma.timeSlot.findUnique({
    where: { id: slotId },
    include: { user: true },
  })

  if (!slot || slot.isBooked) {
    return NextResponse.json({ error: 'Slot not available' }, { status: 400 })
  }

  // Generate Google Meet link (implementation depends on your Google Calendar API setup)
  const meetLink = await generateMeetLink(slot.startTime, slot.duration)

  const interview = await prisma.interview.create({
    data: {
      timeSlotId: slotId,
      interviewerId: slot.userId,
      intervieweeId: session.user.id,
      meetLink,
    },
    include: {
      interviewer: true,
      interviewee: true,
      timeSlot: true,
    },
  })

  await prisma.timeSlot.update({
    where: { id: slotId },
    data: { isBooked: true },
  })

  // Send confirmation emails
  await sendInterviewConfirmation(interview)

  return NextResponse.json(interview)
}