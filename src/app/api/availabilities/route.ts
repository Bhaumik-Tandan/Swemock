import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

type TimeRange = {
  start: string;
  end: string;
}

type AvailabilityInput = {
  [date: string]: TimeRange[];
}

export async function POST(req: NextRequest) {
  try {
    // Get the authenticated user's session
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const availabilities: AvailabilityInput = await req.json();

    // Delete existing unbooked time slots for the user
    await prisma.timeSlot.deleteMany({
      where: {
        userId: user.id,
        isBooked: false,
      },
    });

    if (Object.keys(availabilities).length === 0) {
      return NextResponse.json({
        message: 'Availabilities cleared successfully',
      });
    }

    // Process and save new time slots
    const timeSlots = [];
    for (const [date, slots] of Object.entries(availabilities)) {
      const sortedSlots = slots.sort((a, b) => a.start.localeCompare(b.start));
      
      for (const slot of sortedSlots) {
        const startDateTime = new Date(`${date}T${slot.start}:00`);
        const endDateTime = new Date(`${date}T${slot.end}:00`);
        
        const durationInMinutes = 
          (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);

        timeSlots.push({
          startTime: startDateTime,
          duration: durationInMinutes,
          userId: user.id,
          isBooked: false,
        });
      }
    }

    // Create all time slots in a single transaction
    const result = await prisma.timeSlot.createMany({
      data: timeSlots,
    });

    return NextResponse.json({
      message: 'Availabilities saved successfully',
      count: result.count,
    });

  } catch (error) {
    console.error('Error saving availabilities:', error);
    return NextResponse.json({
      message: 'Error saving availabilities',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Fetch all unbooked time slots for the user
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        userId: user.id,
        isBooked: false,
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    // Group time slots by date
    const groupedAvailabilities: AvailabilityInput = {};
    
    timeSlots.forEach(slot => {
      const date = slot.startTime.toISOString().split('T')[0];
      const startTime = slot.startTime.toTimeString().slice(0, 5); // HH:mm
      const endTime = new Date(slot.startTime.getTime() + slot.duration * 60000)
        .toTimeString()
        .slice(0, 5);

      if (!groupedAvailabilities[date]) {
        groupedAvailabilities[date] = [];
      }

      groupedAvailabilities[date].push({
        start: startTime,
        end: endTime,
      });
    });

    return NextResponse.json(groupedAvailabilities);

  } catch (error) {
    console.error('Error fetching availabilities:', error);
    return NextResponse.json({
      message: 'Error fetching availabilities',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
