'use client'
import React, { useEffect, useState, useRef } from 'react'
import styles from './cardList.module.css'
import Pagination from '../pagination/Pagination'
import Image from 'next/image'
import Card from '../card/Card'
import { useSearchParams } from 'next/navigation'

const HOST = process.env.NEXT_PUBLIC_HOST

const CardList = ({ page, cat }) => {
  const [posts, setPosts] = useState()
  const [count, setCount] = useState()

  const searchParams = useSearchParams()
  const pageFromParams = searchParams.get('page')

  console.log(pageFromParams)
  const scrollHereAfterPageChange = useRef(null)

  const POST_PER_PAGE = 2

  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  useEffect(() => {
    const getData = async (page, cat) => {
      const res = await fetch(
        `${HOST}/api/posts?page=${page}&cat=${cat || ''}`,
        {
          cache: 'no-store',
        }
      )

      if (!res.ok) {
        throw new Error('Failed')
      }

      return res.json()
    }
    const data = async () => {
      const res = await getData(page, cat)
      if (res) {
        setCount(res.count)
        setPosts(res.posts)
      }
      console.log(res)
    }
    data()
  }, [page, cat])

  useEffect(() => {
    if (pageFromParams >= 1 && scrollHereAfterPageChange.current) {
      scrollHereAfterPageChange.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [page])

  return (
    <div className={styles.container} ref={scrollHereAfterPageChange}>
      <h1 className={styles.title}>Recent Posts</h1>

      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item.id} thek={item.id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  )
}

export default CardList
