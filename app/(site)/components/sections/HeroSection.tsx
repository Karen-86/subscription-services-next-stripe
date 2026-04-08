"use client"

import React, { useState } from "react"
import LOCAL_DATA from "@/constants/localData"

const { exampleImage } = LOCAL_DATA.images

const HeroSection = () => {
  return (
    <section
      className="hero flex items-center pt-20! text-center sm:text-left lg:min-h-[calc(100vh-80px)]"
      id="home-page"
    >
      <div className="flex-center container flex flex-col items-center justify-between gap-x-[50px] gap-y-[30px] sm:flex-row">
        <div className={`max-w-[490px]`}>
          <h4 className="sub-title mb-1 text-[18px] font-medium text-[#3e3e3e]">
            Welcome
          </h4>
          <h1 className="title mb-10 text-3xl leading-[1.4] font-medium md:text-5xl md:leading-[1.4]">
            Tailored Services, Designed for You.
          </h1>
        </div>
        <div
          className={`avatar w-full max-w-[400px] delay-300`}
          data-lazy="fade"
        >
          <img
            src={exampleImage}
            alt="avatar"
            className="max-h-[300px] w-full rounded-lg object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
