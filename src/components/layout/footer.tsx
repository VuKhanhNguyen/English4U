import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-paper-canvas border-t border-off-black py-12 mt-auto font-abc-diatype-mono">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-2xl font-bold tracking-tight text-ink">
            English4<span className="text-off-black underline">U</span>
          </Link>
          <p className="text-sm text-faint-text max-w-sm">
            A modern, structured English learning platform for mastering Grammar and Vocabulary.
          </p>
        </div>
        
        <div className="flex gap-6 text-sm font-normal">
          <Link href="#" className="text-off-black hover:underline hover:decoration-off-black transition-all">Terms</Link>
          <Link href="#" className="text-off-black hover:underline hover:decoration-off-black transition-all">Privacy</Link>
          <Link href="#" className="text-off-black hover:underline hover:decoration-off-black transition-all">Contact</Link>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 text-center text-xs text-faint-text">
        &copy; {new Date().getFullYear()} English4U. All rights reserved.
      </div>
    </footer>
  )
}
