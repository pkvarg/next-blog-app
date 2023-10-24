import prisma from '@/utils/connect'
import { NextResponse } from 'next/server'

// GET SINGLE POST By ID
export const GET = async (req, { params }) => {
  const { slug } = params
  console.log('here')

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
