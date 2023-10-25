import { Resend } from 'resend'
import emailTemplate from '@/libs/emailViaResend/emailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)
export default async function EmailViaResend(name, email, message) {
  try {
    await resend.sendEmail({
      from: 'email@project.pictusweb.com',
      to: email,
      subject: 'Your message',
      react: emailTemplate(name, email, message),
    })
    await resend.sendEmail({
      from: 'email@project.pictusweb.com',
      to: 'info@pictusweb.sk',
      subject: 'Nová správa Blog',
      react: emailTemplate(name),
    })
  } catch (error) {
    console.log(error)
  }
}
