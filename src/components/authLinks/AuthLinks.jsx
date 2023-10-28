'use client'
import Link from 'next/link'
import styles from './authLinks.module.css'
import { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'

const AuthLinks = () => {
  const { status, data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const enableWriteEmail = process.env.NEXT_PUBLIC_ADMIN

  useEffect(() => {
    if (session) {
      setEmail(session.user.email)
    }
  }, [session])

  return (
    <>
      {status === 'unauthenticated' ? (
        <Link href='/login' className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          {email === enableWriteEmail && <Link href='/write'>Write</Link>}
          <span className={styles.link} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href='/'>Homepage</Link>
          <Link href='/'>About</Link>
          <Link href='/'>Contact</Link>
          {status === 'notauthenticated' ? (
            <Link href='/login'>Login</Link>
          ) : (
            <span className={styles.link}>Logout</span>
          )}
        </div>
      )}
    </>
  )
}

export default AuthLinks
