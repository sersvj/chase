import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import * as z from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string(),
  message: z.string().min(10),
  recaptchaToken: z.string(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = contactSchema.parse(body)

    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    if (secretKey) {
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${validatedData.recaptchaToken}`
      const verifyRes = await fetch(verifyUrl, { method: 'POST' })
      const verifyJson = await verifyRes.json()

      if (!verifyJson.success) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        )
      }
    } else {
      console.warn('RECAPTCHA_SECRET_KEY is missing. Skipping verification for development.')
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is missing. Simulating success for development.')
      return NextResponse.json({ success: true, message: 'Message received (Simulated)' })
    }

    const { name, email, company, phone, subject, message } = validatedData

    const { data, error } = await resend.emails.send({
      from: 'Chase Creative <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'hello@chasecreative.co'],
      subject: `[Contact Form] ${subject}: ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px; border: 2px solid #1c1c1c; padding: 20px;">
          <h2 style="color: #d22f25; border-bottom: 2px solid #1c1c1c; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 10px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0;">${email}</td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Company:</td>
              <td style="padding: 10px 0;">${company}</td>
            </tr>
            ` : ''}
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 10px 0;">${phone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Subject:</td>
              <td style="padding: 10px 0;">${subject}</td>
            </tr>
          </table>
          
          <div style="background-color: #f5f0eb; padding: 20px; border-radius: 4px; border-left: 4px solid #d22f25;">
            <p style="margin: 0; font-weight: bold; color: #d22f25; margin-bottom: 5px;">Project Details:</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="font-size: 10px; color: #7a7a7a; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
            Chase Creative Co. | Editorial Copywriting & Brand Strategy
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email. Please try again later.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
