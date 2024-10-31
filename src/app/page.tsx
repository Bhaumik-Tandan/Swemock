'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn, signOut, useSession } from "next-auth/react"

const SignInButton = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">
          Signed in as {session.user?.email}
        </span>
        <Button 
          variant="outline" 
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <Button 
      onClick={() => signIn('google')}
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

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthCard />
    </div>
  )
}