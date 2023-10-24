import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styles from './editPost.module.css'

const HOST = process.env.NEXT_PUBLIC_HOST

const getData = async (page, cat) => {
  const res = await fetch(`${HOST}/api/posts?page=${page}&cat=${cat || ''}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed')
  }

  return res.json()
}
const EditPost = () => {
  const [posts, setPosts] = useState()
  const [count, setCount] = useState()
  const page = 1
  const cat = ''

  useEffect(() => {
    const getPosts = async () => {
      const res = await getData(page, cat)
      if (res) {
        console.log(res)
        setPosts(res.posts)
        setCount(res.count)
      }
    }
    getPosts()
  }, [])

  const POST_PER_PAGE = 2

  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit Posts</h1>
        <div className={styles.posts}>
          {posts?.map((item) => (
            <Card item={item} key={item.id} thek={item.id} />
          ))}
        </div>
        {/* <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} /> */}
      </div>
    </>
  )
}

export default EditPost
