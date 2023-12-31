'use client'
import React, { useEffect, useState } from 'react'
import styles from './writeEditPage.module.css'
import axios from 'axios'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { app } from '@/utils/firebase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

const HOST = process.env.NEXT_PUBLIC_HOST

const EditPage = ({ params }) => {
  const { slug } = params
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [intro, setIntro] = useState('')
  const [catSlug, setCatSlug] = useState('')
  const [img, setImg] = useState('')
  const [file, setFile] = useState(null)
  const [media, setMedia] = useState('')

  const [post, setPost] = useState()

  console.log(catSlug)

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
        setIntro(data.intro)
        setMedia(data.img)
        setTitle(data.title)
      }
    }
    getData(slug)
  }, [slug])

  useEffect(() => {
    const storage = getStorage(app)
    const upload = () => {
      const name = new Date().getTime() + file.name
      const storageRef = ref(storage, name)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL)
          })
        }
      )
    }

    file && upload()
  }, [file])

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`/api/posts/edit/${slug}`, {
        title,
        desc: desc,
        intro: intro,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || 'general', //If not selected, choose the general category
      })

      if (res.status === 200) {
        console.log(res)
        router.push(`/write`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete?')

    if (confirmed) {
      try {
        const res = await axios.delete(`/api/posts/edit/${slug}`)

        if (res.status === 200) {
          console.log(res)
          toast.success('Deleted')
          router.push(`/write`)
        }
      } catch (error) {
        toast.error(error.message)
        console.log(error)
      }
    } else {
      console.log('not delete')
    }
  }

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
          <option>Chosse a Category</option>
          <option value='old-testament'>Old Testament</option>
          <option value='new-testament'>New Testament</option>
          <option value='bible'>Bible</option>
          <option value='culture'>culture</option>
          <option value='travel'>travel</option>
          <option value='coding'>coding</option>
        </select>
        <div className={styles.add}>
          {media && (
            <Image
              src={media}
              alt='next-blog'
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: '25%', height: 'auto' }}
            />
          )}
          <input
            type='file'
            id='image'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <textarea
          className={styles.textArea}
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        ></textarea>
        <textarea
          className={styles.textArea}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <button className={styles.publish} onClick={handleSubmit}>
          Publikovať
        </button>
        <button className={styles.delete} onClick={handleDelete}>
          Vymazať
        </button>
      </div>
    </div>
  )
}

export default EditPage
