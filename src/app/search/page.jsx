// app/search/page.jsx
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Find Your Perfect Home</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input placeholder="Location" className="flex-1" />
              <Input placeholder="Price Range" className="flex-1" />
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Property listings will go here */}
          <Card>
            <CardContent className="p-4">
              <p className="text-lg font-semibold">No properties found</p>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;