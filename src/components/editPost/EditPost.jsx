import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styles from './editPost.module.css'
import Pagination from '../pagination/Pagination'
import { useRouter } from 'next/navigation'

// const HOST = process.env.NEXT_PUBLIC_HOST

const getData = async (page, cat) => {
  // const res = await fetch(`${HOST}/api/posts`, {

  const res = await fetch(`/api/posts`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed')
  }

  return res.json()
}
const EditPost = () => {
  const router = useRouter()
  const [posts, setPosts] = useState()

  useEffect(() => {
    const getPosts = async () => {
      const res = await getData()
      if (res) {
        setPosts(res)
      }
    }
    getPosts()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>All Posts</h1>
        <div className={styles.posts}>
          {posts?.map((item) => (
            <Card item={item} key={item.id} thek={item.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default EditPost
