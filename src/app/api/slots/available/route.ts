import { prisma } from '@/app/lib/db'
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
