'use client'
import React, { useEffect, useState } from 'react'
import styles from './writeEditPage.module.css'
import dynamic from 'next/dynamic'

const HOST = process.env.NEXT_PUBLIC_HOST

const page = ({ params }) => {
  const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

  const { slug } = params
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [catSlug, setCatSlug] = useState('')
  const [img, setImg] = useState('')

  const [post, setPost] = useState()

  useEffect(() => {
    const getData = async (slug) => {
      const res = await fetch(`${HOST}/api/posts/edit/${slug}`, {
        cache: 'no-store',
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error('Failed')
      }
      if (data) {
        setCatSlug(data.catSlug)
        setDesc(data.desc)
        setImg(data.img)
        setTitle(data.title)
      }
    }
    getData(slug)
  }, [])

  console.log(desc)

  return (
    <div>
      <h1 className={styles.title}>Edit single blog</h1>
      <div className={styles.container}>
        <input
          type='text'
          placeholder='Title'
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className={styles.select}
          value={catSlug}
          onChange={(e) => setCatSlug(e.target.value)}
        >
          <option value='style'>style</option>
          <option value='fashion'>fashion</option>
          <option value='food'>food</option>
          <option value='culture'>culture</option>
          <option value='travel'>travel</option>
          <option value='coding'>coding</option>
        </select>
        <div className={styles.add}>
          <img src={img} alt={img} />
          <input
            type='file'
            id='image'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <textarea
          className={styles.textArea}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder='Tell your story...'
        ></textarea>
      </div>
    </div>
  )
}

export default page
