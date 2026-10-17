/**
 * Vercel serverless placeholder for contact form POSTs.
 * TODO: connect Nodemailer, Resend, or a database here.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim()
    const phone = String(body.phone ?? '').trim()
    const message = String(body.message ?? '').trim()

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 8) {
      return res.status(400).json({ success: false, error: 'Invalid contact payload.' })
    }

    // TODO: send email / store message
    // await resend.emails.send({ ... })
    console.log('[contact]', { name, email, phone, messageLength: message.length })

    return res.status(200).json({
      success: true,
      message: 'Message received. I will get back to you soon.',
    })
  } catch {
    return res.status(500).json({ success: false, error: 'Server error.' })
  }
}
