import Stripe from "stripe"

export type Service = {
  id: string
  name: string
  description?: string
  images: string[] 
  marketing_features: any[]
  price: number
  quantity: number
  isSubscribed: boolean
}

export type ServiceResponse = Stripe.Product

export type StoredService = {
  serviceId: string
  quantity?: number
}
