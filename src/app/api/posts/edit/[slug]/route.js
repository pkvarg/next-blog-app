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
  console.log('method', req.method)
  const id = params.slug

  try {
    const post = await prisma.post.delete({
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
