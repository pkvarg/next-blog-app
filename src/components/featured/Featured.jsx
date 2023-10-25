import React from 'react'
import styles from './featured.module.css'
import Image from 'next/image'

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Bible Blog</h1>
      <p className={styles.sub}>Refresh Your Spirit of Faith.</p>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image
            src='/bible01.webp'
            alt='bible-blog'
            width={550}
            height={450}
            priority
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            For the word of God is alive and active...
          </h1>
          <p className={styles.postDesc}>
            It penetrates even to dividing soul and spirit... Heb 4:12
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  )
}

export default Featured
