import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src='/logo.webp' alt='bible blog' width={50} height={50} />
          <h1 className={styles.logoText}>Bible blog</h1>
        </div>
        <p className={styles.desc}>
          Copyright &copy; {Date().substring(11, 15)} All rights reserved
        </p>
        <a className={styles.link} href='https://pictusweb.sk' target='_blank'>
          &#60;&#47;&#62; PICTUSWEB Development
        </a>
        <div className={styles.icons}>
          <Image src='/facebook.png' alt='' width={18} height={18} />
          <Image src='/instagram.png' alt='' width={18} height={18} />

          <Image src='/youtube.png' alt='' width={18} height={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          {/* <Link href='/'>Homepage</Link> */}
          <Link href='/blog'>Blog</Link>
          <Link href='/surveys'>Surveys</Link>
          <Link href='/contact'>Contact</Link>
          <Link href='/login'>Login</Link>
        </div>
        {/* <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href='/'>Style</Link>
          <Link href='/'>Fashion</Link>
          <Link href='/'>Coding</Link>
          <Link href='/'>Travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href='/'>Facebook</Link>
          <Link href='/'>Instagram</Link>
          <Link href='/'>Tiktok</Link>
          <Link href='/'>Youtube</Link>
        </div> */}
      </div>
    </div>
  )
}

export default Footer
