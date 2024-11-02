import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  
  if (!session) {
    const headersList = await headers()
    const path = headersList.get("x-pathname") || "/dashboard"
    
    if (path === "/") return redirect("/")
    
    return redirect(`/?callbackUrl=${encodeURIComponent(path)}`)
  }

  return <>{children}</>
}