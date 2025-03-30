"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { BigLogo } from "@atoms/a-big-logo";
import Cookies from 'js-cookie';

// GraphQL Login Mutation
const LOGIN_MUTATION = gql`
  mutation StaffSignIn($email: String!, $password: String!) {
    staffSignIn(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Apollo useMutation hook
  const [staffSignIn, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log("onCompleted called!", data);
      if (data?.staffSignIn?.token) {
        console.log("Token received:", data.staffSignIn.token);
        Cookies.set('token', data.staffSignIn.token, { path: '/admin' });
        router.push("/admin/dashboard");
      } else {
        console.log("No token received in onCompleted:", data);
      }
    },
    onError: (err) => {
      setError("Login failed. Check your credentials.");
      console.error("Login error:", err);
    },
  });


  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    staffSignIn({ variables: { email, password } });
  };



  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#ebebeb] to-[#f0e6ff] bg-cover bg-center">
      <div className="flex-1 flex flex-col items-center justify-center p-4 mt-[100px]">
        <div className="w-full max-w-md mb-8">
          <div className="flex justify-center">
            <AurallyLogo />
          </div>
        </div>

        <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-md p-8">
          <h1 className="text-[#8a2be2] text-3xl font-bold text-center mb-4">Admin Login</h1>

          <div className="text-center text-sm mb-8">
            <span className="text-[#2e2e2e]">New to Aurally? </span>
            <Link href="#" className="text-[#8a2be2] hover:underline">
              Create Account
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#0a0212]">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#0a0212]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <Button type="submit" className="w-full h-12 bg-[#8a2be2] hover:bg-[#7424c1]" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link href="#" className="text-[#8a8aa0] text-sm hover:text-[#595959]">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-4 px-6 text-[#595959] text-sm mt-[100px]">
        <div className="h-[0.5px] w-full max-w-[90%] sm:max-w-screen-lg bg-[#8A8AA0] bg-opacity-40 mb-5 mx-auto"></div>
        <div className="w-full max-w-screen-lg flex flex-col sm:flex-row gap-5 items-center justify-between mx-auto">
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
  );
}

function AurallyLogo() {
  return (
    <BigLogo to="/admin" className="w-88 h-28 xl:w-80 xl:h-48 2xl:w-64 2xl:h-64 lg:translate-y-[50px]" color="#8a2be2" />
  );
}
