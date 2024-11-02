'use client'

export default function ProtectedError({
//   error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Try again
        </button>
      </div>
    </div>
  )
}