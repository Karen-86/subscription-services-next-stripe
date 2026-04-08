"use client";

import React, { useState, useEffect } from "react";
import  ServiceCard  from "../cards/service-card/ServiceCard"
import { useServiceStore } from "@/modules/services/store";
// const services = [
//   {
//     title: "Go-to-Market Strategy",
//     description: "Launch products efficiently",
//     price: "$1,500",
//     features: [
//       { name: "Product Validation" },
//       { name: "Target Segmentation" },
//       { name: "Channel Planning" },
//       { name: "Rapid Testing" },
//       { name: "Content Framework" },
//     ],
//   },
//   {
//     title: "Paid Search & SEO",
//     description: "Boost acquisition efficiently",
//     price: "$2,000",
//     features: [
//       { name: "SEM Campaigns" },
//       { name: "SEO Optimization" },
//       { name: "Keyword Research" },
//       { name: "Landing Pages" },
//       { name: "Performance Reporting" },
//     ],
//   },
//   // {
//   //   title: "Fractional CMO",
//   //   description: "Interim leadership for teams",
//   //   price: "$3,000",
//   //   features: [
//   //     { name: "Marketing Leadership" },
//   //     { name: "Team Mentorship" },
//   //     { name: "Market Analysis" },
//   //     { name: "Campaign Optimization" },
//   //     { name: "Performance Tracking" },
//   //     { name: "Budget Guidance" },
//   //   ],
//   // },
//   // {
//   //   title: "Growth Audits",
//   //   description: "Analyze and optimize campaigns",
//   //   price: "Custom",
//   //   features: [
//   //     { name: "Channel Audit" },
//   //     { name: "Funnel Analysis" },
//   //     { name: "ROI Recommendations" },
//   //     { name: "Roadmap Creation" },
//   //     { name: "Workflow Optimization" },
//   //   ],
//   // },
// ];

const ServicesSection = () => {

  const services = useServiceStore(s=>s.services)
  const isServicesLoading = useServiceStore(s=>s.isServicesLoading)

  // useEffect(() => {
  //   if (!fetchedServices.length) return;
  //   const filtered = fetchedServices.map((fetchedService) => {
  //     const existingService: any = services.find((service) => service.title == fetchedService.name);
  //     if (existingService) {
  //       return {
  //         ...existingService,
  //         priceId: fetchedService.priceId,
  //         quantity: fetchedService.quantity,
  //         price: fetchedService.price,
  //       };
  //     } else {
  //       return {
  //         title: fetchedService.name,
  //         priceId: fetchedService.priceId,
  //         quantity: fetchedService.quantity,
  //         price: fetchedService.price,
  //       };
  //     }
  //   });
  //   setFilteredServcies(filtered);
  // }, [fetchedServices]);

  return (
    <section className="services">
      <div className="container">
        <h2 className="services-title text-3xl font-bold mb-3 text-center">Plans and Pricing</h2>
        <p className="services-description text-center text-sm text-gray-700 mb-8">
          Receive unlimited credits when you pay yearly, and save on your plan.
        </p>

        <div className="services-list flex gap-[30px] justify-center flex-wrap">
          {isServicesLoading ? (
            "Loading..."
          ) : !services.length ? (
            <h2 className="text-3xl text-gray-300 mb-4">Empty</h2>
          ) : (
            <>
              {services
                .sort((a, b) => {
                  if (a.price === 0) return 1; // push a to the end
                  if (b.price === 0) return -1; // push b to the end
                  return a.price - b.price; // normal ascending sort
                })
                .map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    className={`min-w-[280px] max-w-[300px] flex-1 ${
                      service.price == 0
                        ? "bg-black text-white [&_li]:text-white! [&_button]:bg-white [&_button]:text-black! [&_button]:hover:bg-white"
                        : ""
                    } `}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
