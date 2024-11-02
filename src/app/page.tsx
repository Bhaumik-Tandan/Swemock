'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn, signOut, useSession } from "next-auth/react"
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const SignInButton = () => {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  // Auto-trigger sign in if there's a callbackUrl and user isn't authenticated
  useEffect(() => {
    if (status === 'unauthenticated' && searchParams.get('callbackUrl')) {
      signIn('google', { callbackUrl })
    }
  }, [status, callbackUrl, searchParams])

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">
          Signed in as {session.user?.email}
        </span>
        <Button 
          variant="outline" 
          onClick={() => signOut({
            callbackUrl: '/'
          })}
        >
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Button 
      onClick={() => signIn('google', {
        callbackUrl
      })}
    >
      Sign In with Google
    </Button>
  )
}

const AuthCard = () => {
  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>
          Sign in to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <SignInButton />
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Protected by NextAuth.js
      </CardFooter>
    </Card>
  )
}

export default function HomePage() {
  const { status } = useSession()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  // Show loading state while checking session
  if (status === 'loading' && callbackUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthCard />
    </div>
  )
}
