import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { handleUserCreated } from './handlers/handleUserCreated'
import { handleUserDeleted } from './handlers/handleUserDeleted'
import { handleUserUpdated } from './handlers/handleUserUpdated'

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    )
    return NextResponse.json(
      { error: 'Webhook secret is missing' },
      { status: 500 }
    )
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing Svix headers' }, { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const { id } = evt.data
  const eventType = evt.type
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`)

  switch (eventType) {
    case 'user.created':
      await handleUserCreated(evt.data)
      break
    case 'user.deleted':
      if (!id) {
        console.error('Missing user ID in event data')
        return NextResponse.json({ error: 'Missing user ID' }, { status: 400 })
      }
      await handleUserDeleted(id)
      break
    case 'user.updated':
      await handleUserUpdated(evt.data)
      break
    default:
      console.log(`Unhandled event type: ${eventType}`)
      break
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
