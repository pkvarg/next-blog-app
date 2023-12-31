'use client'

import Image from 'next/image'
import styles from './writePage.module.css'
import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.bubble.css'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { app } from '@/utils/firebase'
import EditPost from '@/components/editPost/EditPost'

const WritePage = () => {
  const { status, data: session } = useSession()
  const router = useRouter()
  const enableWriteEmail = process.env.NEXT_PUBLIC_ADMIN

  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [media, setMedia] = useState('')
  const [value, setValue] = useState('')
  const [intro, setIntro] = useState('')
  const [title, setTitle] = useState('')
  const [catSlug, setCatSlug] = useState('')

  // useEffect(() => {
  //   if (session?.user.email !== enableWriteEmail) {
  //     router.push('/')
  //   }
  // }, [session, enableWriteEmail, router])

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

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/')
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

  const handleSubmit = async () => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        intro,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || 'style', //If not selected, choose the general category
      }),
    })

    if (res.status === 200) {
      const data = await res.json()
      router.push(`/posts/${data.slug}`)
    }
  }

  return (
    session?.user.email === enableWriteEmail && (
      <>
        <div className={styles.container}>
          <input
            type='text'
            placeholder='Title'
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className={styles.select}
            onChange={(e) => setCatSlug(e.target.value)}
          >
            <option value='old-testament'>Old Testament</option>
            <option value='new-testament'>New Testament</option>
            <option value='bible'>Bible</option>
            <option value='culture'>culture</option>
            <option value='travel'>travel</option>
            <option value='coding'>coding</option>
          </select>
          <div className={styles.editor}>
            <button className={styles.button} onClick={() => setOpen(!open)}>
              <Image src='/plus.png' alt='' width={16} height={16} />
            </button>
            {open && (
              <div className={styles.add}>
                <input
                  type='file'
                  id='image'
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
                <button className={styles.addButton}>
                  <label htmlFor='image'>
                    <Image src='/image.png' alt='add' width={16} height={16} />
                  </label>
                </button>
                <button className={styles.addButton}>
                  <Image src='/external.png' alt='ext' width={16} height={16} />
                </button>
                <button className={styles.addButton}>
                  <Image src='/video.png' alt='vid' width={16} height={16} />
                </button>
              </div>
            )}
            <div className={styles.textPlusImg}>
              <textarea
                className={styles.textArea}
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder='Intro...'
              ></textarea>
              <textarea
                className={styles.textArea}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Tell your story...'
              ></textarea>
              {media && (
                <Image
                  src={media}
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{ width: '25%', height: 'auto' }}
                />
              )}
            </div>
          </div>

          <button className={styles.publish} onClick={handleSubmit}>
            Publish
          </button>
        </div>
        <EditPost />
      </>
    )
  )
}

export default WritePage
