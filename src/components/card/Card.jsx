'use client'
import Image from 'next/image'
import styles from './card.module.css'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const Card = ({ item, thek }) => {
  const path = usePathname()
  const write = path.includes('write')
  const router = useRouter()
  return (
    <div className={styles.container} key={thek}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image
            src={item.img}
            alt='blog-image'
            fill
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '100%', height: '100%' }}
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{' '}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        {/* <div
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 60) }}
        /> */}
        <p className={styles.intro}>{item.intro}</p>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
        {write && (
          <p
            className={styles.edit}
            onClick={() => router.push(`/write/${item.id}`)}
          >
            Edit this post
          </p>
        )}
      </div>
    </div>
  )
}

export default Card
