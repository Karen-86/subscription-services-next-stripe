"use client"

import React, { use, useState } from "react"
import localData from "@/constants/localData"
import { ButtonDemo } from "@/components/index"
import { ArrowRight } from "lucide-react"
// import * as serviceActions from "@/lib/actions/services"
import { useServiceStore } from "@/modules/services/store"
import * as servicesApi from "@/modules/services/api"
import { redirect } from "next/navigation"
import { Loader2 } from "lucide-react"
import { formatWithCommas } from "@/lib/utils/formatters"
import { successAlert, errorAlert, warningAlert } from "@/lib/utils/alert"

const { markIcon } = localData.svgs

const ServiceCard = ({ service = {}, className = "" }: any) => {
  const authUser = {
    email: "johndoe@gmail.com",
    uid: "1234",
  }

  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    if (!authUser) return warningAlert("Sign in to your account to subscribe.")

    setIsLoading(true)
    const res = await servicesApi.checkout({
      body: {
        service,
        user: {
          email: authUser.email,
          id: authUser.uid,
        },
      },
    })
    setIsLoading(false)

    if (!res.success) return errorAlert(res.message || "error")
    redirect(res.url!)
  }

  return (
    <div
      className={`${className} card services-card flex flex-col rounded-xl border p-6 shadow`}
    >
      <div className="card-header min-h-[70px]">
        <h4 className="text-lg font-normal!">{service.name}</h4>
      </div>
      <div className="card-body mb-3 flex-1">
        <div className="text-[2.1rem] leading-[1.1]">
          {service.price
            ? "$" + formatWithCommas((service.price / 100).toFixed(0))
            : "Custom"}
        </div>
        <div className="mb-7 text-xs">Per month/user</div>
        <p className="card-description mb-2 text-sm font-medium">
          {service.description}
        </p>
        <ul className="mb-4">
          {service.marketing_features &&
            service.marketing_features.map((feature: any, index: any) => {
              return (
                <li
                  key={index}
                  className="mb-2 flex items-center gap-2 text-sm text-gray-500"
                >
                  <div>{markIcon}</div>
                  {feature.name}
                </li>
              )
            })}
        </ul>
      </div>
      <div className="card-body">
        <ButtonDemo
          className="group w-full"
          onClick={() => handleCheckout()}
          disabled={isLoading}
          text={
            <span className="flex items-center justify-center gap-2">
              Get Started
              <ArrowRight className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {isLoading && <Loader2 />}
            </span>
          }
        ></ButtonDemo>
      </div>
    </div>
  )
}

export default ServiceCard
