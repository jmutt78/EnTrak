// app/utils/withAuth.tsx
'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { useEffect, FC } from 'react'

const withAuth = (WrappedComponent: FC): FC => {
  const ProtectedComponent: FC = (props) => {
    const { isSignedIn, isLoaded } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (isLoaded && !isSignedIn) {
        router.push('/sign-in')
      }
    }, [isSignedIn, isLoaded, router])

    if (!isLoaded || !isSignedIn) return null
    return <WrappedComponent {...props} />
  }

  return ProtectedComponent
}

export default withAuth
