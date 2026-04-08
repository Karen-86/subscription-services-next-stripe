"use client"

import React, { useEffect, useState } from "react"
import ServicesSection from "./sections/ServicesSection"
import HeroSection from "./sections/HeroSection"

export default function Template() {
  return (
    <main className="home-page">
      <HeroSection />
      <ServicesSection />
    </main>
  )
}
