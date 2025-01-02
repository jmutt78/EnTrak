'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth, UserButton } from '@clerk/nextjs'
import ThemeToggle from './ThemeToggle'
import { useRouter, usePathname } from 'next/navigation'

const navLinks = [
  { label: 'TV Shows', href: '/tv' },
  { label: 'Movies', href: '/movie' },
  { label: 'Books', href: '/book' }, // Add Trash link here
]

const CustomNavBar = () => {
  const { isSignedIn } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const isActive = (path: string) => pathname === path

  if (!isSignedIn) return null

  return (
    <div className="navbar bg-white dark:bg-black">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            onClick={toggleMenu}
            className="btn btn-ghost btn-circle text-gray-800 dark:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          {isMenuOpen && (
            <ul className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 dark:text-gray-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-gray-800 dark:text-gray-200 ${
                      isActive(link.href) ? 'font-bold' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex-1">
        <Link href="/">
          <span className="btn btn-ghost text-xl text-gray-800 dark:text-gray-200">
            Entrack
          </span>
        </Link>
      </div>

      <div className="navbar-end flex-none gap-2">
        <div className="dropdown dropdown-end ml-6 mr-6">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-10 h-10',
              },
            }}
          />
        </div>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default CustomNavBar
