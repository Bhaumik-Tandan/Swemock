import { prisma } from '@/app/lib/db'
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