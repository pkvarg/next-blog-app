import { Resend } from 'resend'
import emailTemplate from '@/utils/emailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)
export default async function EmailViaResend(name, email, message) {
  try {
    await resend.sendEmail({
      from: 'bible-blog@online',
      to: email,
      subject: 'Your message',
      react: emailTemplate(name, email, message),
    })
    await resend.sendEmail({
      from: 'bible-blog@online',
      to: 'info@pictusweb.sk',
      subject: 'Nová správa Blog',
      react: emailTemplate(name, email, message),
    })
  } catch (error) {
    console.log(error)
  }
}
