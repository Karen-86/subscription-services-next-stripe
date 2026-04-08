// /app/api/checkout/route.ts
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/Stripe"
import type { Service } from "@/modules/services/types"
import createError from "@/lib/utils/createError"
import errorHandlerMiddleware from "@/lib/server/middlewares/system/errorHandler.middleware"

export async function POST(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  try {
    const body = await req.json()

    const { service, user } = body
    if (!service || !user) throw createError("Service or user are missing", 400)

    
    const line_items = [
      {
        price: service.priceId,
        //   price_data: {
        //     currency: "cad",
        //     product_data: { name: service.name },
        //     unit_amount: service.price, // Stripe expects amount in cents
        //   },
        quantity: service.quantity,
      },
    ]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: user.email,
      metadata: {
        userId: user.userId,
      },
      mode: "subscription",
    })

    return NextResponse.json(
      {
        success: true,
        message: "Connected with Stripe successfully",
        url: session.url,
      },
      { status: 200 }
    )
  } catch (err: any) {
    console.error("Stripe checkout error:", err)
    return errorHandlerMiddleware(err)
  }
}

// export async function POST() {
//   return new Response(JSON.stringify({ message: 'Dummy placeholder to prevent errors' }), {
//     status: 501
//   });
// }
