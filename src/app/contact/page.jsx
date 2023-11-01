'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const metadata = {
  title: 'Bible blog Contact',
  description: 'Contact Page',
}

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const x = process.env.NEXT_PUBLIC_EMAIL_EXTRA_ONE
  const y = process.env.NEXT_PUBLIC_EMAIL_EXTRA_TWO

  const [passwordGroupOne, setPasswordGroupOne] = useState(x)
  const [passwordGroupTwo, setPasswordGroupTwo] = useState(y)

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    const bearerToken = process.env.NEXT_PUBLIC_VERCEL_TOKEN

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    }

    if (passwordGroupOne !== x || passwordGroupTwo !== y) {
      toast.error('Error. Send me an email please.')
    } else {
      try {
        const res = await axios.post(
          '/api/sendEmail',
          {
            name,
            email,
            message,
          },
          config
        )
        toast.success('Success. Message sent!')
        setName('')
        setEmail('')
        setMessage('')
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Send me a Message</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src='/contact.webp'
            alt='contact'
            fill={true}
            sizes='x'
            priority
            className={styles.image}
          />
        </div>
        <form className={styles.form} onSubmit={handleSubmitForm}>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='name'
            className={styles.input}
            required
          />
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email'
            className={styles.input}
            required
          />
          <textarea
            className={styles.textArea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='message'
            cols='30'
            rows='8'
            required
          ></textarea>
          <input
            className={styles.password_group}
            type='text'
            defaultValue={passwordGroupOne}
            onChange={(e) => setPasswordGroupOne(e.target.value)}
          />
          <input
            className={styles.password_group}
            type='text'
            defaultValue={passwordGroupTwo}
            onChange={(e) => setPasswordGroupTwo(e.target.value)}
          />
          <button type='submit' className={styles.button}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
