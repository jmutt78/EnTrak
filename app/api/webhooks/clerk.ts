// pages/api/webhooks/clerk.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { clerkClient } from '@clerk/clerk-sdk-node'
import { buffer } from 'micro'

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to get the raw body
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rawBody = (await buffer(req)).toString('utf-8')
    const secret = process.env.CLERK_WEBHOOK_SECRET || ''

    const { type, data } = clerkClient.webhooks.verifyWebhookSignature({
      body: rawBody,
      secret,
      headers: {
        'x-clerk-signature': req.headers['x-clerk-signature'] as string,
        'x-clerk-timestamp': req.headers['x-clerk-timestamp'] as string,
      },
    })

    if (type === 'user.created') {
      // Handle user sign-up
      console.log('User created:', data)
      // Save user to your database
    } else if (type === 'user.updated') {
      // Handle user profile update
      console.log('User updated:', data)
    }

    res.status(200).send('Success')
  } catch (error) {
    console.error('Webhook verification failed:', error)
    return res.status(400).send('Webhook error')
  }
}

export default handler
