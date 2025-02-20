import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "lib/stripe";
import { db } from "lib/db";

import { createLogging, Logging } from "lib/logging";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    const logging = {
      url: req.url,
      method: req.method,
      body: body,
      statusCode: 400,
      errorMessage: error.message,
      createdAt: new Date(),
    };

    await createLogging(logging);

    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      const logging = {
        url: req.url,
        method: req.method,
        body: body,
        statusCode: 400,
        errorMessage: "Missing metadata",
        createdAt: new Date(),
      };

      await createLogging(logging);

      return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
    }

    await db.purchase.create({
      data: {
        courseId: courseId,
        userId: userId,
      }
    });
  } else {
    const logging = {
      url: req.url,
      method: req.method,
      body: body,
      statusCode: 200,
      createdAt: new Date(),
    };

    await createLogging(logging);

    return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
  }

  const logging = {
    url: req.url,
    method: req.method,
    body: body,
    statusCode: 200,
    createdAt: new Date(),
  };

  await createLogging(logging);

  return new NextResponse(null, { status: 200 });
}