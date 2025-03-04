"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Label } from "@/app/components/ui/label"
import { BigLogo } from "@atoms/a-big-logo";

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#ebebeb] to-[#f0e6ff] bg-pattern">
      <div className="flex-1 flex flex-col items-center justify-center p-4  mt-[100px]">
        <div className="w-full max-w-md mb-8">
          <div className="flex justify-center">
            <AurallyLogo />
          </div>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-[#8a2be2] text-3xl font-bold text-center mb-4">Admin Login</h1>

          <div className="text-center text-sm mb-8">
            <span className="text-[#2e2e2e]">New to Aurally? </span>
            <Link href="#" className="text-[#8a2be2] hover:underline">
              Create Account
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#0a0212]">
                Email address<span className="text-[#8a2be2]">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g john@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#d7d7d7] h-12 rounded text-[#0a0212]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#0a0212]">
                Password<span className="text-[#8a2be2]">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="@tyr$#wti"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#d7d7d7] h-12 rounded text-[#0a0212]"
              />
            </div>

            <Button type="submit" className="w-full h-12 bg-[#8a2be2] hover:bg-[#7424c1] text-white font-medium">
              Login
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link href="#" className="text-[#8a8aa0] text-sm hover:text-[#595959]">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-4 px-6  text-[#595959] text-sm mt-[100px]">
      <div className="h-[0.5px] w-full max-w-[90%] sm:max-w-screen-lg bg-[#8A8AA0] bg-opacity-40 mb-5 mx-auto"></div>
      <div className="w-full max-w-screen-lg flex flex-col sm:flex-row gap-5 items-center justify-between   mx-auto">
          <div className="hidden sm:block text-left">
            © {new Date().getFullYear()} Aurally. All rights reserved
          </div>

          <div className="flex gap-6 text-right hidden sm:flex">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
          </div>

          <div className="flex flex-col items-center sm:hidden text-center gap-1">
          <div className="mt-7">© {new Date().getFullYear()} Aurally. All rights reserved</div>
          <div className="mt-7"><Link href="/privacy-policy">Privacy Policy</Link></div>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
           
          </div>
        </div>
      </footer>
    </div>
  )
}

function AurallyLogo() {
  return (
    <BigLogo
      to="/admin"
      className="w-88 h-28 xl:w-80 xl:h-48 2xl:w-64 2xl:h-64 lg:translate-y-[50px]"
      color="#8a2be2"
    />
  );
}