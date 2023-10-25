'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'

const metadata = {
  title: 'Bible blog Contact',
  description: 'Contact Page',
}

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmitForm = (e) => {
    e.preventDefault()
    console.log(name, email, message)
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's Keep in Touch</h1>
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
          />
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email'
            className={styles.input}
          />
          <textarea
            className={styles.textArea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='message'
            cols='30'
            rows='8'
          ></textarea>
          <button type='submit' className={styles.button}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
