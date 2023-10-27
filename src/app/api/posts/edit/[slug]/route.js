import prisma from '@/utils/connect'
import { NextResponse } from 'next/server'

// GET SINGLE POST By ID
export const GET = async (req, { params }) => {
  const { slug } = params

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: slug,
      },
    })

    return new NextResponse(JSON.stringify(post, { status: 200 }))
  } catch (err) {
    console.log(err)
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }, { status: 500 })
    )
  }
}

// UPDATE SINGLE POST By ID
export const POST = async (req, { params }) => {
  if (req.method !== 'POST') return
  console.log('method', req.method)
  const id = params.slug
  console.log(id)
  const body = await req.json()
  const { title, desc, intro, img, slug, catSlug } = body
  try {
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        desc: desc,
        intro,
        intro,
        img: img,
        slug: slug,
        catSlug: catSlug,
      },
    })

    return new NextResponse(JSON.stringify(post, { status: 200 }))
  } catch (err) {
    console.log(err)
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }, { status: 500 })
    )
  }
}

// DELETE SINGLE POST By ID
export const DELETE = async (req, { params }) => {
  if (req.method !== 'DELETE') return

  console.log('method', req.method)
  const id = params.slug

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    })

    if (post) {
      const postSlugDB = post.slug
      const comments = await prisma.comment.findMany({
        where: {
          postSlug: postSlugDB,
        },
      })
      if (comments) {
        console.log(comments)
        await prisma.comment.deleteMany({
          where: {
            postSlug: postSlugDB,
          },
        })
      } else {
        console.log('no comments')
      }
    }
    await prisma.post.delete({
      where: {
        id: id,
      },
    })

    return new NextResponse(
      JSON.stringify({ message: 'Blog deleted!' }, { status: 200 })
    )
  } catch (err) {
    console.log(err)
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }, { status: 500 })
    )
  }
}
