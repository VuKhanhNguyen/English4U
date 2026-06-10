"use client";

import * as React from "react"
import Link from "next/link"
import { SocialIcon } from "react-social-icons"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/providers/language-provider"
import { showToast } from "@/components/ui/toast"


export function Footer() {
  const { translate } = useLanguage();
  return (
    <footer className="bg-gradient-to-b from-[#1c2431] to-[#111721] text-neutral-300 pt-16 pb-12 mt-auto font-abc-diatype-mono border-t border-[#2d3748]/30">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <motion.img 
                  src="/imgs/logo2.png" 
                  alt="English4U Logo" 
                  className="h-[45px] w-auto object-contain"
                  whileHover={{
                    y: [0, -4, 0],
                    transition: {
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                />
                <span className="text-white font-bold tracking-wider text-lg uppercase font-sans">
                  English4U
                </span>
              </Link>
            </div>
            <p className="text-[#8ea0b5] text-sm leading-relaxed max-w-xs font-sans mt-2">
              Speak English confidently every day!
              <br />
              Learning English has never been easier!
              <br />
              Grow your skills and future opportunities!
              </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4 md:pl-12">
            <h3 className="text-white font-bold tracking-wide text-base font-sans">
              {translate("Quick Links")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="flex flex-col gap-3">
                <li>
                  <Link 
                    href="/#about" 
                    className="text-[#8ea0b5] hover:text-white transition-colors text-sm underline decoration-[#8ea0b5]/50 hover:decoration-white"
                  >
                    {translate("About")}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/resources" 
                    className="text-[#8ea0b5] hover:text-white transition-colors text-sm underline decoration-[#8ea0b5]/50 hover:decoration-white"
                  >
                    {translate("Resources")}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#contact" 
                    className="text-[#8ea0b5] hover:text-white transition-colors text-sm underline decoration-[#8ea0b5]/50 hover:decoration-white"
                  >
                    {translate("Contact")}
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link 
                    href="/destination/b1" 
                    className="text-[#8ea0b5] hover:text-white transition-colors text-sm underline decoration-[#8ea0b5]/50 hover:decoration-white"
                  >
                    Destination B1
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/destination/b2" 
                    className="text-[#8ea0b5] hover:text-white transition-colors text-sm underline decoration-[#8ea0b5]/50 hover:decoration-white"
                  >
                    Destination B2
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      showToast({
                        title: "Under Development",
                        message: "Destination C1 & C2 is currently under development. Stay tuned!",
                        variant: "warning",
                        position: "top-right",
                      });
                    }}
                    className="text-[#8ea0b5] hover:text-white transition-colors text-sm underline decoration-[#8ea0b5]/50 hover:decoration-white cursor-pointer"
                  >
                    Destination C1-C2
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Connect */}
          <div className="flex flex-col gap-4 md:pl-12">
            <h3 className="text-white font-bold tracking-wide text-base font-sans">
              {translate("Connect")}
            </h3>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialIcon 
                url="https://linkedin.com" 
                bgColor="transparent" 
                fgColor="#8ea0b5" 
                style={{ height: 35, width: 35 }}
                label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              />
              <SocialIcon 
                url="https://facebook.com" 
                bgColor="transparent" 
                fgColor="#8ea0b5" 
                style={{ height: 35, width: 35 }}
                label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              />
              <SocialIcon 
                url="https://github.com" 
                bgColor="transparent" 
                fgColor="#8ea0b5" 
                style={{ height: 35, width: 35 }}
                label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              />
            </div>

            {/* Contact Email */}
            <div className="mt-2">
              <a 
                href="mailto:nguyenvukhanh392@gmail.com" 
                className="text-[#8ea0b5] hover:text-white transition-colors text-sm underline decoration-[#8ea0b5]/50 hover:decoration-white font-sans"
              >
                nguyenvukhanh392@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="border-[#2d3748]/30 mb-8" />

        {/* Copyright Text */}
        <div className="text-center text-xs text-[#5a6e85]">
          &copy; {new Date().getFullYear()} English4U. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
