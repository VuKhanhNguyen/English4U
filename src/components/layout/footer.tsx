import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-pale-ash border-t border-charcoal-border py-12 mt-auto">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-2xl font-bold tracking-tight text-midnight-ink">
            English4<span className="text-accent-green">U</span>
          </Link>
          <p className="text-sm text-[#737373] max-w-sm">
            A modern, structured English learning platform for mastering Grammar and Vocabulary.
          </p>
        </div>
        
        <div className="flex gap-6 text-sm font-medium">
          <Link href="#" className="hover:text-accent-green transition-colors">Terms</Link>
          <Link href="#" className="hover:text-accent-green transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-accent-green transition-colors">Contact</Link>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 text-center text-xs text-[#737373]">
        &copy; {new Date().getFullYear()} English4U. All rights reserved.
      </div>
    </footer>
  )
}
