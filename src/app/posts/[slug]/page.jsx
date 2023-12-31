import Menu from '@/components/Menu/Menu'
import styles from './singlePage.module.css'
import Image from 'next/image'
import Comments from '@/components/comments/Comments'

const HOST = process.env.NEXT_PUBLIC_HOST

const getData = async (slug) => {
  const res = await fetch(`${HOST}/api/posts/${slug}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed')
  }

  return res.json()
}

const SinglePage = async ({ params }) => {
  const { slug } = params

  const data = await getData(slug)

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user.image}
                  alt='blog-img'
                  fill
                  sizes='x'
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>
                {data?.user.name === 'Peter Varga'
                  ? 'Simon Peter'
                  : data?.user.name}
              </span>
              <span className={styles.date}>
                {data?.createdAt.slice(0, 10)}
              </span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image
              priority
              src={data.img}
              alt='next-img'
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: '100%', height: '100%', paddingTop: '7.5%' }}
            />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        {/* <Menu /> */}
      </div>
    </div>
  )
}

export default SinglePage
