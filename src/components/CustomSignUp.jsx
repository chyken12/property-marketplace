// components/CustomSignUp.js
'use client';
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";

export default function CustomSignUp() {
  const { isLoaded, signUp } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  if (!isLoaded) {
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.update({
        unsafeMetadata: {
          role,
        },
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log("Invalid verification code");
      } else {
        // Redirect to appropriate dashboard based on role
        window.location.href = role === "landlord" ? "dashboard/landLord" : "dashboard/tenant/tickets";
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {!pendingVerification ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Select role</option>
                <option value="landlord">Landlord</option>
                <option value="tenant">Tenant</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Sign up
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Verification Code</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Verify Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}