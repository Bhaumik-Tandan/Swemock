// lib/mail.ts

import nodemailer from 'nodemailer'
import { format } from 'date-fns'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendInterviewConfirmation(interview: any) {
  const { interviewer, interviewee, timeSlot, meetLink } = interview
  const startTime = format(new Date(timeSlot.startTime), 'PPpp')

  // Send email to interviewer
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: interviewer.email,
    subject: 'Mock Interview Scheduled - Interviewer Confirmation',
    html: `
      <h2>Mock Interview Scheduled</h2>
      <p>You have a mock interview scheduled as an interviewer.</p>
      <p><strong>Date and Time:</strong> ${startTime}</p>
      <p><strong>Duration:</strong> ${timeSlot.duration} minutes</p>
      <p><strong>Interviewee:</strong> ${interviewee.name}</p>
      <p><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
    `,
  })

  // Send email to interviewee
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: interviewee.email,
    subject: 'Mock Interview Scheduled - Interviewee Confirmation',
    html: `
      <h2>Mock Interview Scheduled</h2>
      <p>Your mock interview has been scheduled.</p>
      <p><strong>Date and Time:</strong> ${startTime}</p>
      <p><strong>Duration:</strong> ${timeSlot.duration} minutes</p>
      <p><strong>Interviewer:</strong> ${interviewer.name}</p>
      <p><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
    `,
  })
}