'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter  } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building, Home, Search, UserPlus, CheckCircle, Star, ArrowRight, MessageCircle, Menu, Moon, Sun, Bed, Bath, SquareFoot, MapPin, DollarSign } from "lucide-react"
import { SignIn,SignUp, UserButton, UserProfile } from '@clerk/nextjs'
import { useUser , useSignOut } from '@clerk/nextjs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default function LandingPage() {

  const { isLoaded, isSignedIn, user } = useUser()
  
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const [activeListingType, setActiveListingType] = useState('all')

  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    priceRange: ''
  })




  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search params:', searchParams)
    // Implement search functionality here
  }
 

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'how-it-works', 'testimonials', 'blog', 'faq']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const features = [
    { icon: Search, title: "Smart Search", description: "Find your ideal property with our advanced filters and AI-powered recommendations." },
    { icon: UserPlus, title: "Direct Communication", description: "Connect seamlessly with landlords or tenants through our secure messaging system." },
    { icon: CheckCircle, title: "Verified Listings", description: "All properties are verified by our team to ensure safety and authenticity." },
    { icon: Home, title: "Virtual Tours", description: "Explore properties from the comfort of your home with our 3D virtual tour feature." },
    { icon: Building, title: "Property Management", description: "Landlords can easily manage multiple properties, tenants, and payments in one place." },
    { icon: Star, title: "Reviews & Ratings", description: "Make informed decisions with our community-driven review and rating system." },
  ]

  const steps = [
    { title: "Create Your Profile", description: "Sign up and set your preferences as a tenant or landlord." },
    { title: "Browse or List", description: "Search for properties or list your own with detailed information and virtual tours." },
    { title: "Connect", description: "Communicate directly through our secure messaging system to ask questions or schedule viewings." },
    { title: "Book Viewings", description: "Schedule in-person or virtual property visits at your convenience." },
    { title: "Secure Your Rental", description: "Complete the rental process with our secure application and payment system." },
  ]

  const tableRows = [
    { feature: "Property Search", tenant: "✓", landlord: "-" },
    { feature: "Listing Creation", tenant: "-", landlord: "✓" },
    { feature: "Messaging", tenant: "✓", landlord: "✓" },
    { feature: "Application Submission", tenant: "✓", landlord: "-" },
    { feature: "Tenant Screening", tenant: "-", landlord: "✓" },
    { feature: "Rent Payments", tenant: "✓", landlord: "✓" },
    { feature: "Maintenance Requests", tenant: "✓", landlord: "✓" },
  ]

  const testimonials = [
    { name: "Sarah T.", role: "Tenant", content: "RentMarketplace made finding my dream apartment a breeze. The interface is so intuitive!" },
    { name: "Michael R.", role: "Landlord", content: "As a landlord, this platform has simplified my rental process significantly. The tenant screening tools are invaluable." },
    { name: "Emily L.", role: "Tenant", content: "I love how easy it is to communicate with landlords and schedule viewings. It saved me so much time!" },
    { name: "David K.", role:  "Landlord", content: "The virtual tour feature has been a game-changer for my listings. I'm getting quality tenants faster than ever." },
  ]

  const blogPosts = [
    { title: "10 Tips for First-Time Renters", excerpt: "Navigate your first rental experience with confidence using these essential tips.", image: "/placeholder.svg?height=200&width=300" },
    { title: "Maximizing Your Rental Property's Potential", excerpt: "Learn how to increase the value and appeal of your rental property with these strategies.", image: "/placeholder.svg?height=200&width=300" },
    { title: "Understanding Rental Laws in Your Area", excerpt: "Stay informed about local rental regulations to protect your rights as a tenant or landlord.", image: "/placeholder.svg?height=200&width=300" },
  ]

  const faqItems = [
    { q: "How much does it cost to use RentMarketplace?", a: "RentMarketplace is free for tenants to use. Landlords pay a small fee for listing their properties, which includes access to all our tools and features." },
    { q: "Is my personal information secure?", a: "Yes, we use industry-standard encryption and security measures to protect your personal data. We never share your information with third parties without your explicit consent." },
    { q: "Can I cancel my account at any time?", a: "Absolutely. You can cancel your account at any time with no questions asked. If you're a landlord with an active subscription, you'll receive a prorated refund for any unused time." },
    { q: "How do I report a problem with a listing or user?", a: "We have a dedicated support team to handle any issues. You can report a problem directly through the listing page or contact our support team via the help center." },
  ]

  const featuredListings = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      image: "/placeholder.svg?height=300&width=400",
      price: 1500,
      beds: 2,
      baths: 2,
      sqft: 1000,
      location: "Downtown, City Center",
      type: "Apartment"
    },
    {
      id: 2,
      title: "Cozy Suburban House",
      image: "/placeholder.svg?height=300&width=400",
      price: 2200,
      beds: 3,
      baths: 2.5,
      sqft: 1800,
      location: "Quiet Neighborhood, Suburb",
      type: "House"
    },
    {
      id: 3,
      title: "Luxury Waterfront Condo",
      image: "/placeholder.svg?height=300&width=400",
      price: 3500,
      beds: 3,
      baths: 3,
      sqft: 2200,
      location: "Waterfront, Marina District",
      type: "Condo"
    },
    {
      id: 4,
      title: "Charming Studio in Arts District",
      image: "/placeholder.svg?height=300&width=400",
      price: 1200,
      beds: 1,
      baths: 1,
      sqft: 600,
      location: "Arts District, Downtown",
      type: "Apartment"
    },
    {
      id: 5,
      title: "Family-Friendly Townhouse",
      image: "/placeholder.svg?height=300&width=400",
      price: 2800,
      beds: 4,
      baths: 3,
      sqft: 2400,
      location: "Family Neighborhood, Suburbs",
      type: "House"
    },
    {
      id: 6,
      title: "Penthouse with City Views",
      image: "/placeholder.svg?height=300&width=400",
      price: 5000,
      beds: 3,
      baths: 3.5,
      sqft: 3000,
      location: "City Center, Skyline District",
      type: "Condo"
    }
  ]
  const filteredListings = activeListingType === 'all' 
  ? featuredListings 
  : featuredListings.filter(listing => listing.type.toLowerCase() === activeListingType)

  return (
    <div className={`flex flex-col min-h-screen bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-primary" size={24} />
            <span className="text-xl font-bold">RentMarketplace</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            {['Features', 'How It Works', 'Testimonials', 'Blog', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  activeSection === item.toLowerCase().replace(' ', '-') ? 'text-primary' : ''
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
          {isSignedIn ? (
                <div className="user-profile-container">
                  <UserButton/>
                </div>
            ) : (
                <div className="text-center">
                  <Link href='/sign-up'><Button>create account</Button></Link>
                    
                </div>
            )}
            {/* Other landing page content goes here */}
          
            
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleDarkMode}
              className="text-foreground"
            >
              {isDarkMode ? <Sun className="h-5 w-5" size={20} /> : <Moon className="h-5 w-5" size={20} />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" size={24} />
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {['Features', 'How It Works', 'Testimonials', 'Blog', 'FAQ'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ opacity }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/banner.jpg"
              alt="Modern apartment interior"
              layout="fill"
              objectFit="cover"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Home with RentMarketplace
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connecting tenants and landlords seamlessly. Start your journey to a better rental experience today.
            </p>
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-background/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input
                  name="location"
                  placeholder="Location"
                  value={searchParams.location}
                  onChange={handleSearchChange}
                  className="bg-background/50 placeholder-muted-foreground text-foreground"
                />
                <select
                  name="propertyType"
                  value={searchParams.propertyType}
                  onChange={handleSearchChange}
                  className="w-full p-2 rounded-md bg-background/50 text-foreground"
                >
                  <option value="">Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                </select>
                <Input
                  name="priceRange"
                  placeholder="Max Price"
                  type="number"
                  value={searchParams.priceRange}
                  onChange={handleSearchChange}
                  className="bg-background/50 placeholder-muted-foreground text-foreground"
                />
              </div>
              <Button type="submit" size="lg" className="w-full md:w-auto">
                Search Properties
              </Button>
            </form>
          </div>
        </section>

        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { label: "Active Listings", value: "10,000+" },
                { label: "Happy Tenants", value: "50,000+" },
                { label: "Trusted Landlords", value: "5,000+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-xl">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="listings" className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Listings</h2>
            <Tabs defaultValue="all" className="w-full mb-8">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="all" onClick={() => setActiveListingType('all')}>All</TabsTrigger>
                <TabsTrigger value="apartment" onClick={() => setActiveListingType('apartment')}>Apartments</TabsTrigger>
                <TabsTrigger value="house" onClick={() => setActiveListingType('house')}>Houses</TabsTrigger>
                <TabsTrigger value="condo" onClick={() => setActiveListingType('condo')}>Condos</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <AnimatePresence>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {filteredListings.map((listing) => (
                      <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                          <Image
                            src={listing.image}
                            alt={listing.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                            <p className="text-2xl font-bold text-primary mb-4">${listing.price}/month</p>
                            <div className="flex justify-between mb-4">
                              <div className="flex items-center">
                                <Bed className="w-5 h-5 mr-1" />
                                <span>{listing.beds} beds</span>
                              </div>
                              <div className="flex items-center">
                                <Bath className="w-5 h-5 mr-1" />
                                <span>{listing.baths} baths</span>
                              </div>
                              <div className="flex items-center">
                               
                              </div>
                            </div>
                            <div className="flex items-center mb-2">
                              <MapPin className="w-5 h-5 mr-1 text-muted-foreground" />
                              <p className="text-muted-foreground">{listing.location}</p>
                            </div>
                            <Badge>{listing.type}</Badge>
                          </CardContent>
                          <CardFooter className="bg-secondary/10 p-4">
                            <Button className="w-full">View Details</Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
              <TabsContent value="apartment">
                <AnimatePresence>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {filteredListings.map((listing) => (
                      <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                          <Image
                            src={listing.image}
                            alt={listing.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                            <p className="text-2xl font-bold text-primary mb-4">${listing.price}/month</p>
                            <div className="flex justify-between mb-4">
                              <div className="flex items-center">
                                <Bed className="w-5 h-5 mr-1" />
                                <span>{listing.beds} beds</span>
                              </div>
                              <div className="flex items-center">
                                <Bath className="w-5 h-5 mr-1" />
                                <span>{listing.baths} baths</span>
                              </div>
                              <div className="flex items-center">
                                
                              </div>
                            </div>
                            <div className="flex items-center mb-2">
                              <MapPin className="w-5 h-5 mr-1 text-muted-foreground" />
                              <p className="text-muted-foreground">{listing.location}</p>
                            </div>
                            <Badge>{listing.type}</Badge>
                          </CardContent>
                          <CardFooter className="bg-secondary/10 p-4">
                            <Button className="w-full">View Details</Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
              <TabsContent value="house">
                <AnimatePresence>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {filteredListings.map((listing) => (
                      <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                          <Image
                            src={listing.image}
                            alt={listing.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                            <p className="text-2xl font-bold text-primary mb-4">${listing.price}/month</p>
                            <div className="flex justify-between mb-4">
                              <div className="flex items-center">
                                <Bed className="w-5 h-5 mr-1" />
                                <span>{listing.beds} beds</span>
                              </div>
                              <div className="flex items-center">
                                <Bath className="w-5 h-5 mr-1" />
                                <span>{listing.baths} baths</span>
                              </div>
                              <div className="flex items-center">
                                <SquareFoot className="w-5 h-5 mr-1" />
                                <span>{listing.sqft} sqft</span>
                              </div>
                            </div>
                            <div className="flex items-center mb-2">
                              <MapPin className="w-5 h-5 mr-1 text-muted-foreground" />
                              <p className="text-muted-foreground">{listing.location}</p>
                            </div>
                            <Badge>{listing.type}</Badge>
                          </CardContent>
                          <CardFooter className="bg-secondary/10 p-4">
                            <Button className="w-full">View Details</Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
              <TabsContent value="condo">
                <AnimatePresence>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {filteredListings.map((listing) => (
                      <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                          <Image
                            src={listing.image}
                            alt={listing.title}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                            <p className="text-2xl font-bold text-primary mb-4">${listing.price}/month</p>
                            <div className="flex justify-between mb-4">
                              <div className="flex items-center">
                                <Bed className="w-5 h-5 mr-1" />
                                <span>{listing.beds} beds</span>
                              </div>
                              <div className="flex items-center">
                                <Bath className="w-5 h-5 mr-1" />
                                <span>{listing.baths} baths</span>
                              </div>
                              <div className="flex items-center">
                                <SquareFoot className="w-5 h-5 mr-1" />
                                <span>{listing.sqft} sqft</span>
                              </div>
                            </div>
                            <div className="flex items-center mb-2">
                              <MapPin className="w-5 h-5 mr-1 text-muted-foreground" />
                              <p className="text-muted-foreground">{listing.location}</p>
                            </div>
                            <Badge>{listing.type}</Badge>
                          </CardContent>
                          <CardFooter className="bg-secondary/10 p-4">
                            <Button className="w-full">View Details</Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            </Tabs>
            <div className="text-center mt-12">
              <Button size="lg">View All Listings</Button>
            </div>
          </div>
        </section>


        <section id="how-it-works" className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-center mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Tailored for Tenants and Landlords</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Feature</TableHead>
                  <TableHead>Tenants</TableHead>
                  <TableHead>Landlords</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    <TableCell>{row.tenant}</TableCell>
                    <TableCell>{row.landlord}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section id="testimonials" className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="flex overflow-hidden"
                initial={{ x: 0}}
                animate={{x: "-100%"}}
                transition={{duration: 20, repeat: Infinity, ease: "linear"}}
              >
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="flex-shrink-0 w-full mx-4">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Avatar className="w-12 h-12 mr-4">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${testimonial.name.charAt(0)}`} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <Badge variant="secondary">{testimonial.role}</Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{testimonial.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="blog" className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Latest from Our Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <Image src="/blog1.jpg" alt={post.title} width={300} height={200} className="w-full h-48 object-cover" />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button variant="outline" size="sm">Read More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-2xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Simplify Your Rental Experience?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join RentMarketplace today and discover a better way to rent. No credit card required to get started.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Input className="max-w-xs mx-auto sm:mx-0 bg-background text-foreground" placeholder="Enter your email" type="email" />
              <Button size="lg" variant="secondary">Get Started</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">About Us</Link></li>
                <li><Link href="#" className="hover:underline">Careers</Link></li>
                <li><Link href="#" className="hover:underline">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">Blog</Link></li>
                <li><Link href="#" className="hover:underline">Help Center</Link></li>
                <li><Link href="#" className="hover:underline">Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
                <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:underline">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Stay Connected</h3>
              <form className="space-y-2">
                <Input placeholder="Your email" type="email" className="bg-background text-foreground" />
                <Button type="submit" size="sm">Subscribe</Button>
              </form>
              <div className="mt-4 flex space-x-4">
                <Link href="#" className="text-primary hover:text-primary/80">Twitter</Link>
                <Link href="#" className="text-primary hover:text-primary/80">Facebook</Link>
                <Link href="#" className="text-primary hover:text-primary/80">Instagram</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p>&copy; 2024 RentMarketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50">
        <Button size="lg" className="rounded-full shadow-lg">
          <MessageCircle className="mr-2 h-4 w-4" size={16} /> Chat with Us
        </Button>
      </div>
    </div>
  )
}