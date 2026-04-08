import { create } from "zustand"
import type {
  Service,
  ServiceResponse,
  StoredService,
} from "@/modules/services/types"
import Stripe from "stripe"
import * as servicesApi from "@/modules/services/api"

const noop = () => {}

type ServiceStore = {
  services: Service[]
  isServicesLoading: boolean
  getServicesAsync: (params?: any) => Promise<void>
}

export const useServiceStore = create<ServiceStore>((set, get) => ({
  services: [],
  isServicesLoading: false,
  isProductLoading: false,

  getServicesAsync: async ({ successCB = noop, errorCB = noop } = {}) => {
    set({ isServicesLoading: true })

    try {
      const data = await servicesApi.getServices()

      if (!data.success) return errorCB(data.message)
      console.log(data, " =getServicesAsync=")

      //   const cartItems = JSON.parse(localStorage.getItem("cart") || "[]")

      const filteredData = data.data.data.map((service: ServiceResponse) => {
        const price = service.default_price as Stripe.Price
        // const storedService = cartItems.find(
        //   (item: storedService) => item.serviceId === service.id
        // )
        const storedService: any = null

        return {
          id: service.id,
          name: service.name,
          description: service.description,
          images: service.images,
          // price: (price.unit_amount! / 100).toFixed(2),
          price: price.unit_amount,
          priceId: price.id,
          marketing_features: service.marketing_features,

          quantity: storedService?.quantity || 1,
          //   isSubscribed: !!storedService,
        }
      })

      set({ services: filteredData })
      successCB(data.message)
    } finally {
      set({ isServicesLoading: false })
    }
  },
}))
