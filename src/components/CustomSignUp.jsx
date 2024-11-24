// components/CustomSignUp.js
'use client';

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from 'lucide-react'
import Link from 'next/link'
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"




import { useSignUp } from "@clerk/nextjs";
import { useRouter } from 'next/navigation'

export default function CustomSignUp() {
  const { toast } = useToast()
  



  const { isLoaded, signUp } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    // Simple password strength calculation
    const strength = Math.min(100, Math.max(0, password.length * 10))
    setPasswordStrength(strength)
  }, [password])

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
      toast({
        title: "Verification Needed",
        description: "Please check your email for the verification code.",
        variant: "default"
      });
      toast({
        title: "Sign Up Error",
        description: err.message || "Failed to create account",
        variant: "destructive"
      });
      
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        toast({
          title: "Verification Failed",
          description: "Invalid verification code",
          variant: "destructive"
        });
        
      } else {
        toast({
          title: "Verification Success",
          description: "Redirecting to dashboard...",
          variant: "default"
        });
        // Redirect to appropriate dashboard based on role
        window.location.href = role === "landlord" ? "/landLord" : "tenant/tickets";
      }
    } catch (err) {
      toast({
        title: "Verification Error",
        description: err.message || "An error occurred during verification",
        variant: "destructive"
      });
      
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-100 p-4">
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Building2 className="w-8 h-8 text-orange-600" />
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-600">RentConnect</CardTitle>
        </div>
        <CardDescription className="text-base">
          Find your next home or rent out your property with ease.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!pendingVerification ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-black-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
              />
              <Progress value={passwordStrength} className="h-2 w-full" />
              <p className="text-xs text-muted-foreground">
                Password strength: {passwordStrength < 30 ? 'Weak' : passwordStrength < 70 ? 'Medium' : 'Strong'}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <RadioGroup value={role} onValueChange={setRole} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="landlord" id="landlord" />
                  <Label htmlFor="landlord">Landlord</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tenant" id="tenant" />
                  <Label htmlFor="tenant">Tenant</Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orang-700 hover:to-orange-700 transition-all duration-200">
              Sign Up
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your verification code"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-orage-500"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700 transition-all duration-200">
              Verify Email
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <p className="text-sm text-center w-full text-muted-foreground">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
        <div className="text-sm text-center w-full">
          Already have an account?{' '}
          <Link href="/signin" className="text-orange-600 hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  </div>
  );
}