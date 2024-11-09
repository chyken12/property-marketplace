"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { Home, UserPlus, ArrowRight, Loader2 } from 'lucide-react';
import { useSignIn, useSignUp, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AuthFlow = () => {
  const router = useRouter();
  const { signIn, isLoading: isSigningIn, setActive: setSignInActive } = useSignIn();
  const { signUp, isLoading: isSigningUp, setActive: setSignUpActive } = useSignUp();
  const { isSignedIn, user } = useUser();

  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('signin');

  const isLoading = isSigningIn || isSigningUp;

  // Check if user is already signed in
  useEffect(() => {
    if (isSignedIn && user) {
      const userType = user.unsafeMetadata.userType;
      router.push(userType === 'tenant' ? '/search' : '/dashboard');
    }
  }, [isSignedIn, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!userType) {
      setError('Please select whether you are a tenant or property owner');
      return;
    }

    try {
      if (activeTab === 'signin') {
        const result = await signIn.create({
          identifier: email,
          password,
        });

        if (result.status === "complete") {
          await setSignInActive({ session: result.createdSessionId });
          
          // Update user metadata
          await user?.update({
            unsafeMetadata: {
              userType: userType,
            },
          });

          router.push(userType === 'tenant' ? '/search' : '/dashboard');
        } else {
          console.log("Sign in status:", result.status);
          if (result.firstFactorVerification?.status === "pending") {
            router.push('/verify-email');
          }
        }
      } else {
        const result = await signUp.create({
          emailAddress: email,
          password,
          unsafeMetadata: {
            userType: userType,
            createdAt: new Date().toISOString(),
          },
        });

        if (result.status === "complete") {
          await setSignUpActive({ session: result.createdSessionId });
          router.push(userType === 'tenant' ? '/onboarding/tenant' : '/onboarding/owner');
        } else if (result.status === "missing_requirements") {
          if (result.missing_requirements.includes("email_verification")) {
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            router.push('/verify-email');
          }
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.errors?.[0]?.message || 'Authentication failed. Please try again.');
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    setError('');
    setEmail('');
    setPassword('');
  };

  if (isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">Redirecting...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {!userType ? 'Welcome to HomeConnect' : userType === 'tenant' ? 'Find Your Next Home' : 'List Your Property'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!userType ? (
            <div className="space-y-4">
              <Button
                className="w-full h-16 text-lg justify-start space-x-4"
                variant="outline"
                onClick={() => setUserType('tenant')}
              >
                <Home className="h-6 w-6" />
                <span>I&apos;m looking for accommodation</span>
                <ArrowRight className="ml-auto" />
              </Button>

              <Button
                className="w-full h-16 text-lg justify-start space-x-4"
                variant="outline"
                onClick={() => setUserType('owner')}
              >
                <UserPlus className="h-6 w-6" />
                <span>I&apos;m a property owner</span>
                <ArrowRight className="ml-auto" />
              </Button>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>

        {userType && (
          <CardFooter className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() => {
                setUserType(null);
                setError('');
              }}
              className="text-sm"
              disabled={isLoading}
            >
              ← Change user type
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthFlow;