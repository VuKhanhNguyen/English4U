"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import FloatingLines from "@/components/FloatingLines";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-clip bg-paper-canvas">
      {/* Base background color */}
      <div className="fixed inset-0 bg-paper-canvas -z-20" />
      {/* FloatingLines animation layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <FloatingLines />
      </div>

      <Navbar />

      <main className="flex-grow pt-32 pb-24 md:pt-40 md:pb-32 z-10 container mx-auto px-6 max-w-[1432px]">
        {/* Hero Section Mock Skeleton */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-off-black/10 dark:border-white/10 pb-8 mt-28">
          <div className="max-w-2xl w-full">
            <div className="mb-4">
              {/* Category Breadcrumb */}
              <Skeleton width={180} height={20} borderRadius={10} />
            </div>
            <div className="mb-4">
              {/* Page Title */}
              <Skeleton width="60%" height={40} />
            </div>
            <div className="max-w-xl">
              {/* Description subtitle */}
              <Skeleton count={2} height={16} className="mt-2" />
            </div>
          </div>
          {/* Search bar skeleton */}
          <div className="w-full md:w-[280px]">
            <Skeleton height={40} borderRadius={20} />
          </div>
        </div>

        {/* Info card skeleton */}
        <div className="mb-6 p-6 md:p-10 border border-off-black/10 dark:border-white/10 rounded-[30px] bg-atmosphere-wash/20 flex flex-row items-center justify-between">
          <div className="w-2/3">
            <Skeleton width={120} height={24} borderRadius={12} className="mb-3" />
            <Skeleton width={300} height={28} />
          </div>
          <div className="text-right hidden sm:block w-1/3">
            <Skeleton width={100} height={14} className="mb-1 ml-auto" />
            <Skeleton width={80} height={32} className="ml-auto" />
          </div>
        </div>

        {/* Syllabus Explorer grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar skeleton (Desktop only) */}
          <aside className="hidden md:flex md:col-span-4 lg:col-span-3 flex-col bg-paper-canvas/90 dark:bg-zinc-900/40 rounded-lg p-5 border border-off-black/5 dark:border-white/5 space-y-4">
            <div className="pb-3 border-b border-off-black/5 dark:border-white/5">
              <Skeleton width={100} height={14} />
              <Skeleton width={80} height={10} className="mt-1" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-full">
                  <Skeleton height={44} borderRadius={8} />
                </div>
              ))}
            </div>
          </aside>

          {/* Main content skeleton */}
          <div className="md:col-span-8 lg:col-span-9 w-full">
            <div className="p-4 md:p-8 border border-off-black/10 dark:border-white/10 rounded-[30px] bg-paper-canvas/30 space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border-b border-off-black/10 dark:border-white/10 pb-5">
                  <div className="flex justify-between items-center py-2">
                    <Skeleton width="40%" height={24} />
                    <Skeleton width={24} height={24} circle />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
