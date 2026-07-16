import React from 'react';
import { Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, Heart, Share2, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"



// Mock components to represent Sha

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm text-slate-500">
          <li><a href="#" className="hover:underline">Apparel</a></li>
          <ChevronRight className="h-4 w-4" />
          <li><a href="#" className="hover:underline">Outerwear</a></li>
          <ChevronRight className="h-4 w-4" />
          <li className="font-medium text-slate-900">Minimalist Bomber Jacket</li>
        </ol>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
          
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000"
                alt="Minimalist Bomber Jacket - Front View"
                className="h-full w-full object-cover object-center"
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[
                "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=200",
                "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=200"
              ].map((src, index) => (
                <button 
                  key={index} 
                  className={`aspect-square overflow-hidden rounded-md border bg-slate-100 ${index === 0 ? 'border-slate-900 ring-2 ring-slate-900' : 'border-slate-200'}`}
                >
                  <img src={src} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover object-center" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <Badge className="mb-2">New Arrival</Badge>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Minimalist Bomber Jacket
                </h1>
                <p className="text-sm text-slate-500 mt-1">Product ID: MBJ-9920</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="p-2 rounded-full w-10 h-10">
                  <Share2 className="h-4 w-4 text-slate-600" />
                </Button>
                <Button variant="outline" className="p-2 rounded-full w-10 h-10">
                  <Heart className="h-4 w-4 text-slate-600" />
                </Button>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-current' : 'text-slate-300'}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600">4.2 (128 reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-3xl font-bold tracking-tight text-slate-900">$189.00</span>
              <span className="text-lg text-slate-400 line-through">$245.00</span>
              <Badge className="bg-red-50 text-red-700 border-red-200">Save 23%</Badge>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <p className="text-base text-slate-600 leading-relaxed">
                Crafted from premium water-resistant matte nylon and filled with lightweight synthetic down. Features a clean, hardware-minimal profile, hidden zippers, and ribbed collar detailing. Tailored for a modern, versatile silhouette.
              </p>
            </div>

            {/* Color Selector */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-slate-900">Color: <span className="font-normal text-slate-500">Obsidian Black</span></h3>
              <div className="mt-3 flex items-center space-x-3">
                <button className="h-8 w-8 rounded-full bg-slate-950 ring-2 ring-slate-950 ring-offset-2 focus:outline-none" aria-label="Black" />
                <button className="h-8 w-8 rounded-full bg-emerald-950 ring-0 ring-offset-2 hover:ring-2 hover:ring-slate-400 focus:outline-none" aria-label="Forest Green" />
                <button className="h-8 w-8 rounded-full bg-slate-400 ring-0 ring-offset-2 hover:ring-2 hover:ring-slate-400 focus:outline-none" aria-label="Stone Gray" />
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-900">Size</h3>
                <a href="#" className="text-sm font-medium text-slate-600 hover:underline">Size guide</a>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {['S', 'M', 'L', 'XL'].map((size, index) => (
                  <button
                    key={size}
                    className={`flex items-center justify-center rounded-md border py-3 text-sm font-medium uppercase focus:outline-none
                      ${index === 1 
                        ? 'border-slate-900 bg-slate-900 text-white' 
                        : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="flex-1 h-12 gap-2 text-base">
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1 h-12 text-base">
                Buy Now
              </Button>
            </div>

            {/* Policy Info */}
            <div className="mt-8 border-t border-slate-200 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex gap-3 items-start">
                <Truck className="h-5 w-5 text-slate-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">Free Shipping</h4>
                  <p className="text-xs text-slate-500 mt-0.5">On all orders over $150</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <RotateCcw className="h-5 w-5 text-slate-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">30-Day Returns</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Hassle-free online returns</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <ShieldCheck className="h-5 w-5 text-slate-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">Secure Checkout</h4>
                  <p className="text-xs text-slate-500 mt-0.5">SSL encrypted transactions</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}