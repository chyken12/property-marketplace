// components/CustomSignIn.js
'use client';
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";

export default function CustomSignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoaded) {
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        
        // Get user metadata to determine role
        const user = result.userData;
        const role = user?.unsafeMetadata?.role;
        
        // Redirect based on role
        window.location.href = role === "landlord" ? "/landLord/dashboard" : "dashboard/tenant";
      }
    } catch (err) {
      console.error("Error:", err.errors ? err.errors[0].message : err);
      setError(err.errors ? err.errors[0].message : "An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Sign In</h2>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            <Link href="/sign-up" className="text-blue-500 hover:text-blue-600">
              Don&#39;t have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )}
