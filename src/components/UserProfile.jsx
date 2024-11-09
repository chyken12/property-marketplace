'use client'

import React from 'react';
import { useUser , useSignOut } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';

const UserProfile = () => {
    const { user, isSignedIn } = useUser ();
    const { signOut } = useSignOut();

    return (
        <div className="flex items-center space-x-4">
            {isSignedIn ? (
                <>
                    <div className="flex items-center space-x-2">
                        {/* Use the Image component from next/image */}
                        <Image 
                            src={user.profileImageUrl} 
                            alt={user.fullName || 'User  Profile Image'} 
                            width={40} 
                            height={40} 
                            className="rounded-full" 
                        />
                        <span className="font-semibold">{user.fullName || user.email}</span>
                    </div>
                    <Button onClick={() => signOut()} variant="outline">
                        Sign Out
                    </Button>
                </>
            ) : (
                <Link href="/authFlow">
                    <Button>
                        Sign In / Sign Up
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default UserProfile;