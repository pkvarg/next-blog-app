import { NextResponse } from 'next/server'
import EmailViaResend from '@/utils/emailViaResend'

// send email
export const POST = async (req) => {
  try {
    const body = await req.json()
    const { name, email, message } = body
    console.log(body)
    await EmailViaResend(name, email, message)
    return new NextResponse(JSON.stringify({ message: 'OK' }, { status: 200 }))
  } catch (err) {
    console.log(err)
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }, { status: 500 })
    )
  }
}
